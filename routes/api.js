var config    = require('../config');
var knex      = require('knex')(config.db);
var bookshelf = require('bookshelf')(knex);
var jwt       = require('jsonwebtoken');
var bcrypt    = require('bcrypt');

// User model
var User = bookshelf.Model.extend({
  tableName: 'users',

  initialize: function() {
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

  // Middleware
  apiRouter.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, config.secret, function(err, auth) {
        if (err) {
          return res.status(403).send({
            error: true,
            message: 'Failed to authenticate token.'
          });
        } else {
          req.auth = auth;
          next();
        }
      });
    } else if (!token) {
      req.auth = null;
      next()
    }
  });

  // User
  apiRouter.route('/users')
    // Create a user
    .post(function (req, res) {
      User
        .forge({
          username:   req.body.username,
          password:   req.body.password,
          first_name: req.body.first_name,
          last_name:  req.body.last_name
        })
        .save()
        .then(function (model) {
          res.json(model.toJSON());
        })
        .catch(function (error) {
          console.log(error);
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
          res.json({
            error: true,
            message: 'User not found.'
          });
        } else if (user) {
          var validPassword = user.comparePassword(req.body.password);

          if (!validPassword) {
            res.json({
              error: true,
              message: 'Invalid password.'
            });
          } else if (validPassword) {
            var token = jwt.sign({
              user_id: user.id,
              admin: false
            }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });

            res.json({
              error: false,
              message: 'Enjoy your token!',
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
