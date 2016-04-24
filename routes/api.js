var config    = require('../config');
var knexfile    = require('../knexfile');
var knex      = require('knex')(knexfile.development);
var bookshelf = require('bookshelf')(knex);
var bcrypt    = require('bcrypt');
var Checkit   = require('checkit');
var jwt       = require('jsonwebtoken');

// User model
var User = bookshelf.Model.extend({
  tableName: 'users',

  initialize: function() {
    this.on('saving', this.validateSave);
    this.on('saving', this.encryptPassword);
  },

  // Users subscribe books
  books: function() {
    return this.belongsToMany(Book);
  },

  // Users create posts
  posts: function() {
    return this.hasMany(Post);
  },

  validateSave: function() {
    var checkit = new Checkit({
      username: 'required',
      password: ['required', 'minLength:5'],
      full_name: 'required'
    });

    return checkit.run(this.attributes);
  },

  // Encrypt the password
  encryptPassword: function() {
    this.set({
      password: bcrypt.hashSync(this.get('password'), config.saltRounds)
    });
  },

  // Compare the plain password to the encrypted password
  comparePassword: function(password) {
    return bcrypt.compareSync(password, this.get('password'));
  }
});

// Book model
var Book = bookshelf.Model.extend({
  tableName: 'books',

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
    return this.belongsTo(Post);
  }
});

module.exports = function (app, express) {
  var apiRouter = express.Router();

  // Middleware - all requests will pass through this
  apiRouter.use(function (req, res, next) {
    var isRegisterRequest = req.method == 'POST' && (req.url == '/users' || req.url == '/authenticate');

    if (isRegisterRequest) {
      next()
    } else {
      // Check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];

      if (token) {
        // If a token is provided, verify it
        jwt.verify(token, config.secret, function(err, auth) {
          if (err) {
            return res.status(401).send({
              message: 'Failed to authenticate the token.'
            });
          } else {
            req.auth = auth;
            next();
          }
        });
      } else {
        // If a token is not provided, reject the request
        res.status(401).json({
          message: 'Token is not provided.'
        })
      }
    }
  });

  // User
  apiRouter.route('/users')
    // Create a user
    .post(function (req, res) {
      User
        .forge({
          username:    req.body.username,
          password:    req.body.password,
          full_name:   req.body.full_name,
          is_verified: false
        })
        .save()
        .then(function (user) {
          res.status(201).json({
            'success': true
          });
        })
        .catch(function (err) {
          if (err.code == 23505) {
            res.status(400).json({
              message: {
                username: 'Username already exists'
              }
            })
          } else {
            res.status(400).json({
              message: err
            })
          }
        });
    });

  // Login
  apiRouter.post('/authenticate', function(req, res) {
    User.forge({
      username: req.body.username
    })
      .fetch()
      .then(function (user) {
        if (!user) {
          res.status(400).json({
            message: 'User is not found'
          });
        } else if (user) {
          var validPassword = user.comparePassword(req.body.password);

          if (!validPassword) {
            res.status(401).json({
              message: 'Invalid password'
            });
          } else if (validPassword) {
            var token = jwt.sign({
              user_id: user.id,
              admin: false
            }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });

            res.status(201).json({
              token: token
            });
          }
        }
    })
  });

  // Book
  apiRouter.route('/books')
    // Create a book
    .post(function (req, res) {
      Book
        .forge({
          title:  req.body.title,
          author: req.body.author
        })
        .save()
        .then(function (model) {
          res.send(model.toJSON());
        })
        .catch(function (error) {
          console.log(error);
          res.send('Error saving a book');
        });
    });

  apiRouter.route('/books/:book_id/posts')
    // Get all posts of a book
    .get(function (req, res) {
      Book
        .where({id: req.params.book_id})
        .fetch({withRelated: ['posts']})
        .then(function (book) {
          res.json(book.related('posts'));
        })
        .catch(function(err) {
          res.json({
            error: true,
            message: err
          })
        });
    });

  // Book Subscription
  apiRouter.route('/books/:book_id/subscription')
    .put(function (req, res) {
      Book.where('id', req.params.book_id).fetch().then(function (book) {
        User.where('id', req.auth.user_id).fetch().then(function (user) {
          book.users().attach(user).then(function () {
            res.json({
              error: false,
              subscribed: true
            });
          }).catch(function (err) {
            res.json({
              error: true,
              message: err
            });
          });
        })
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
          price:       req.body.price,
          active:      true
        })
        .save()
        .then(function (model) {
          res.json(model.toJSON());
        })
        .catch(function (err) {
          res.json({
            error: true,
            message: err
          });
        });
    });

  return apiRouter;
};
