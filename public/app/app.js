angular.module('bookie', ['angularMoment', 'bookieRoute', 'authService', 'bookService', 'postService', 'userService'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })

  .controller('GlobalCtrl', ['$window', '$location', 'Auth', function($window, $location, Auth) {
    var vm = this;

    vm.logout = function () {
      Auth.logout();
      $location.path('/');
    };

    vm.isLoggedIn = function () {
      return Auth.isLoggedIn();
    };

    vm.getUsername = function () {
      return Auth.getUsername();
    }
  }])

  .controller('UserCtrl', ['$window', '$location', 'User', 'Auth', function($window, $location, User, Auth) {
    var vm = this;

    vm.errorMessage = null;

    vm.getErrorMessage = function () {
      return vm.errorMessage;
    };

    vm.signup = function (user) {
      User
        .signup(user)
        .then(function () {
          $location.path('/signup/success');
        }, function (err) {
          vm.errorMessage = err.message;
        });
    };

    vm.login = function (user) {
      Auth
        .login(user.username, user.password)
        .then(function () {
          $location.path('/');
        }, function (err) {
          vm.errorMessage = err.message;
        });
    };
  }])

  .controller('UserVerificationCtrl', ['$routeParams', 'User', function($routeParams, User) {
    var vm = this;

    User
      .verify($routeParams.key)
      .then(function (res) {
        if (res.is_verified) {
          vm.message = "You are verified!"
        } else {
          vm.message = res.message;
        }
      }, function (err) {
        vm.message = err.message;
      })
  }])

  .controller('BookIndexCtrl', ['Book', function (Book) {
    var vm = this;

    Book
      .getAll()
      .then(function (data) {
        vm.books = data;
      }, function (err) {
        console.log(err);
      });
  }])

  .controller('BookCtrl', ['$location', 'Book', function ($location, Book) {
    var vm = this;

    vm.save = function (book) {
      Book
        .save(book)
        .then(function (res) {
          console.log(res);
        }, function (err) {
          console.log(err);
        })
    };
  }])

  .controller('BookPostsCtrl', ['$location', '$routeParams', 'Book', function ($location, $routeParams, Book) {
    var vm = this;

    vm.subscribed = null;
    vm.numberOfSubscribers = 0;

    vm.isSubscribed = function () {
      return vm.subscribed;
    };

    vm.getNumberOfSubscribers = function () {
      return vm.numberOfSubscribers;
    };

    // Get book info
    Book
      .get($routeParams.book_id)
      .then(function (data) {
        vm.book = data;

        // Get the number of subscribers
        Book
          .getSubscribers($routeParams.book_id)
          .then(function (subscribers) {
            vm.numberOfSubscribers = subscribers.length
          });

        // Check subscription
        Book
          .check_subscription($routeParams.book_id)
          .then(function (data) {
            vm.subscribed = data.subscribed;
          });

        // Get all posts under this book
        Book
          .getPosts($routeParams.book_id)
          .then(function (data) {
            vm.posts = data;
          }, function (err) {
            console.log(err);
          });

      }, function () {
        $location.path('/books');
      });

    vm.subscribe = function () {
      Book
        .subscribe($routeParams.book_id)
        .then(function (res) {
          vm.subscribed = res.subscribed;
          vm.numberOfSubscribers += 1;
        }, function (err) {
          console.log(err);
        })
    };

    vm.unsubscribe = function () {
      Book
        .unsubscribe($routeParams.book_id)
        .then(function (res) {
          vm.subscribed = res.subscribed;
          vm.numberOfSubscribers -= 1;
        }, function (err) {
          console.log(err);
        })
    };
  }])

  .controller('PostCtrl', ['$location', 'Book', 'Post', function ($location, Book, Post) {
    var vm = this;

    Book
      .getAll()
      .then(function (data) {
        vm.books = data;
      }, function (err) {
        console.log(err);
      });

    vm.save = function (post) {
      Post
        .save(post)
        .then(function () {
          $location.path('/books/' + post.book_id + '/posts');
        }, function (err) {
          console.log(err);
        })
    };
  }])

  .directive('selectBook', function () {
    return {
      restrict: 'A',
      link: function(scope, element) {
        $(element).dropdown({
          fullTextSearch: true,
          message: {
            noResults: 'No results found: <a href="/books/new">Create a new book?</a>'
          }
        });
      }
    }
  })

  .directive('selectCondition', function () {
    return {
      restrict: 'A',
      link: function(scope, element) {
        $(element).dropdown();
      }
    }
  });
