var config    = require('../config');
var knexfile  = require('../knexfile');
var knex      = require('knex')(knexfile.development);
var bookshelf = require('bookshelf')(knex);
var bcrypt    = require('bcrypt');
var Checkit   = require('checkit');
var crypto    = require('crypto');
var jwt       = require('jsonwebtoken');
var sendgrid  = require('sendgrid')(config.sendGridAPIKey);

// User Verification
var UserVerification = bookshelf.Model.extend({
  tableName: 'user_verifications',

  user: function () {
    return this.belongsTo(User);
  }
});

// User model
var User = bookshelf.Model.extend({
  tableName: 'users',

  initialize: function () {
    this.on('creating', this.validateSave);
    this.on('saved', this.sendVerification);
  },

  // Validation
  validateSave: function () {
    var checkit = new Checkit({
      username: 'required',
      password: ['required', 'minLength:5'],
      full_name: 'required'
    });

    return checkit.run(this.attributes);
  },

  // Send email verification
  sendVerification: function () {
    var user = this;

    if (!user.get('is_verified')) {
      crypto.randomBytes(32, function(err, buffer) {
        var key = buffer.toString('hex');

        knex('user_verifications')
          .insert({
            user_id: user.get('id'),
            key:     key
          })
          .then(function () {
            sendgrid.send({
              to      : user.get('username') + '@rose-hulman.edu',
              from    : 'noreply@rhit.io',
              subject : 'Bookie Email Verification',
              text    : 'Here is your verification link: http://localhost:8080/users/verify?key=' + key
            }, function(err, json) {
              if (err) { console.error(err); }
              console.log(json);
            });
          })
      });
    }
  },

  // Compare the plain password to the encrypted password
  comparePassword: function (password) {
    return bcrypt.compareSync(password, this.get('password'));
  },

  // Users have email verifications
  user_verifications: function () {
    return this.hasMany(UserVerification);
  },

  // Users subscribe books
  books: function () {
    return this.belongsToMany(Book);
  },

  // Users create posts
  posts: function() {
    return this.hasMany(Post);
  }
});

// Book model
var Book = bookshelf.Model.extend({
  tableName: 'books',

  initialize: function () {
    this.on('saving', this.validateSave);
  },

  // Validation
  validateSave: function () {
    var checkit = new Checkit({
      title: 'required',
      author: 'required',
      ISBN_13: 'minLength:13',
      image_url: 'url'
    });

    return checkit.run(this.attributes);
  },

  // A book can be subscribed by many users
  users: function () {
    return this.belongsToMany(User);
  },

  // A book can be related to many posts
  posts: function () {
    return this.hasMany(Post);
  }
});

// Post model
var Post = bookshelf.Model.extend({
  tableName: 'posts',

  // A post is created by one user
  user: function () {
    return this.belongsTo(User);
  },

  // A post is about one book
  book: function () {
    return this.belongsTo(Book);
  }
});

module.exports = function (app, express) {
  var apiRouter = express.Router();

  // Middleware - all requests will pass through this first
  apiRouter.use(function (req, res, next) {
    var isRegularRequest = req.method == 'POST' &&
                            (req.url == '/users'
                             || req.url == '/users/verify'
                             || req.url == '/authenticate');

    if (isRegularRequest) {
      next()
    } else {
      // Check header or url parameters or post parameters for token
      var token = req.headers['x-access-token'] || req.query.token || req.body.token;

      if (token) {
        // If a token is provided, verify it
        jwt.verify(token, config.secret, function(err, auth) {
          if (err) {
            return res.status(401).send({
              message: 'Authentication Failed'
            });
          } else {
            req.auth = auth;
            next();
          }
        });
      } else {
        // If a token is not provided, reject the request
        res.status(401).json({
          message: 'Token Not Found'
        })
      }
    }
  });

  // User
  apiRouter.route('/users')
    // Create a user
    .post(function (req, res) {
      // Check if the user exists
      User
        .where('username', req.body.username)
        .fetch()
        .then(function (user) {
          // User exists and is verified
          if (user && user.get('is_verified')) {
            res.status(400).json({
              message: 'Username already exists.'
            })
          } else if (user && !user.get('is_verified')) {
            // User exists but is not verified
            // Only change the password and full_name
            User
              .forge({
                id: user.get('id')
              })
              .save({
                password:  bcrypt.hashSync(req.body.password, config.saltRounds),
                full_name: req.body.full_name
              }, {patch: true})
              .then(function () {
                res.status(200).json({
                  verification_sent: true
                })
              })
              .catch(function () {
                res.status(400).json({
                  message: 'Registration Fail'
                })
              })
          } else {
            User
              .forge({
                username:    req.body.username,
                password:    bcrypt.hashSync(req.body.password, config.saltRounds),
                full_name:   req.body.full_name,
                is_verified: false
              })
              .save()
              .then(function () {
                res.status(201).json({
                  verification_sent: true
                });
              })
              .catch(function () {
                res.status(400).json({
                  message: 'Registration Fail'
                });
              });
          }
        })
        .catch(function () {
          res.status(400).json({
            message: 'Registration Fail'
          });
        });
    })

  // Get the authenticated user's info
  apiRouter.get('/user', function (req, res) {
    User
      .where('id', req.auth.user_id)
      .fetch({
        columns: ['id', 'username', 'full_name']
      })
      .then(function (user) {
        res.status(200).json(user);
      })
      .catch(function () {
        res.status(404).json({
          message: "User Not Found"
        })
      });
  });

  // User verification
  apiRouter.post('/users/verify', function (req, res) {
    UserVerification
      .where('key', req.body.key)
      .fetch()
      .then(function (verification) {
        var half_an_hour = 30 * 60 * 1000; // in ms

        // Check if the verification key has been expired
        if (((new Date) - verification.get('created_at')) <= half_an_hour) {
          User
            .where('id', verification.get('user_id'))
            .save({is_verified: true}, {patch: true})
            .then(function () {
              res.status(200).json({
                is_verified: true
              })
            })
            .catch(function () {
              res.status(200).json({
                message: 'The verification process failed.'
              })
            });
        } else {
          res.status(200).json({
            message: 'The verification key has been expired.'
          })
        }
      })
      .catch(function () {
        res.status(400).json({
          message: 'The verification key is invalid.'
        })
      });
  });

  // Login
  apiRouter.post('/authenticate', function(req, res) {
    User
      .where({username: req.body.username})
      .fetch()
      .then(function (user) {
        if (!user) {
          res.status(404).json({
            message: 'User Not Found'
          });
        } else {
          if (!user.get('is_verified')) {
            res.status(401).json({
              message: 'User is not verified, please check your rose-hulman email address.'
            });
          } else {
            var validPassword = user.comparePassword(req.body.password);

            if (!validPassword) {
              res.status(401).json({
                message: 'Invalid password'
              });
            } else {
              var token = jwt.sign({
                user_id: user.id
              }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });

              res.status(201).json({
                token: token
              });
            }
          }
        }
    })
  });

  // Book
  apiRouter.route('/books')
  // Get all books
    .get(function (req, res) {
      Book
        .fetchAll()
        .then(function (books) {
          res.json(books);
        })
        .catch(function(err) {
          res.json({
            error: true,
            message: err
          })
        });
    })
    // Create a book
    .post(function (req, res) {
      Book
        .forge({
          title:     req.body.title,
          author:    req.body.author,
          isbn_13:   req.body.isbn_13,
          image_url: req.body.image_url
        })
        .save()
        .then(function () {
          res.status(201).json({
            success: true
          });
        })
        .catch(function (err) {
            res.status(400).json({
              message: err
            })
        });
    });

  apiRouter.route('/books/:book_id')
    // Get a book
    .get(function (req, res) {
      Book
        .where({id: req.params.book_id})
        .fetch()
        .then(function (book) {
          if (book) {
            res.status(200).json(book);
          } else {
            res.status(404).json({
              message: "Book Not Found"
            })
          }
        })
        .catch(function() {
          res.status(404).json({
            message: "Book Not Found"
          })
        });
    });

  apiRouter.route('/books/:book_id/posts')
    // Get all active posts of a book
    .get(function (req, res) {
      Book
        .where({id: req.params.book_id})
        .fetch({withRelated: [{
          "posts": function(qb) {
            qb
              .select('id', 'user_id', 'book_id', 'description', 'condition', 'price', 'created_at')
              .where('active', '=', true);
          },
          "posts.user": function(qb) {
            qb
              .select('id', 'username', 'full_name');
          }
        }]})
        .then(function (book) {
          res.status(200).json(book.related('posts'));
        })
        .catch(function() {
          res.status(400).json({
            message: 'Book Not Found'
          })
        });
    });

  // Book Subscription
  apiRouter.route('/books/:book_id/subscription')
    // Check if you are subscribed to the repository
    .get(function (req, res) {
      Book
        .where('id', req.params.book_id)
        .fetch({withRelated: ['users']})
        .then(function (book) {
          if (book) {
            book
              .related('users')
              .query({where: {id: req.auth.user_id}})
              .fetchOne()
              .then(function (user) {
                if (user) {
                  res.status(200).json({
                    subscribed: true
                  })
                } else {
                  res.status(200).json({
                    subscribed: false
                  });
                }
              });
          } else {
            res.status(404).json({
              message: "Book Not Found"
            });
          }
        });
    })
    // Subscribe the book by the authenticated user
    .put(function (req, res) {
      // Check if user has subscribed the book
      Book
        .where('id', req.params.book_id)
        .fetch({withRelated: ['users']})
        .then(function (book) {
          if (book) {
            book
              .related('users')
              .query({where: {id: req.auth.user_id}})
              .fetchOne()
              .then(function (user) {
                if (user) {
                  res.status(200).json({
                    "subscribed": true
                  })
                } else {
                  User
                    .where('id', req.auth.user_id)
                    .fetch()
                    .then(function (user) {
                      book
                        .users()
                        .attach(user)
                        .then(function () {
                          res.json({
                            subscribed: true
                          })
                        });
                    });
                }
              });
          } else {
            res.status(404).json({
              message: "Book Not Found"
            });
          }
        });
    })
    // Delete a subscription
    .delete(function (req, res) {
      // Check if user has subscribed the book
      Book
        .where('id', req.params.book_id)
        .fetch({withRelated: ['users']})
        .then(function (book) {
          if (book) {
            book
              .related('users')
              .query({where: {id: req.auth.user_id}})
              .fetchOne()
              .then(function (user) {
                if (user) {
                  User
                    .where('id', req.auth.user_id)
                    .fetch()
                    .then(function (user) {
                      book
                        .users()
                        .detach(user)
                        .then(function () {
                          res.json({
                            subscribed: false
                          })
                        });
                    });
                } else {
                  res.status(200).json({
                    "subscribed": false
                  })
                }
              });
          } else {
            res.status(404).json({
              message: "Book Not Found"
            });
          }
        });
    });

  apiRouter.route('/books/:book_id/subscribers')
    // Get the subscribers of the book
    .get(function (req, res) {
      Book
        .where('id', req.params.book_id)
        .fetch({withRelated: ['users']})
        .then(function (book) {
          if (book) {
            book
              .related('users')
              .fetch({columns: ['user_id', 'username', 'full_name']})
              .then(function (user) {
                res.status(200).json(user.toJSON({omitPivot: true}));
              })
          } else {
            res.status(404).json({
              message: "Book Not Found"
            });
          }
        });
    });

  // Post
  apiRouter.route('/posts')
    // Create a post
    .post(function (req, res) {
      Post
        .forge({
          user_id:     req.auth.user_id,
          book_id:     req.body.book_id,
          description: req.body.description,
          condition:   req.body.condition,
          price:       req.body.price,
          active:      true
        })
        .save()
        .then(function () {
          res.status(200).json({
            created: true
          });
        })
        .catch(function () {
          res.status(400).json({
            message: "Post Creation Failed"
          });
        });
    });

  return apiRouter;
};
