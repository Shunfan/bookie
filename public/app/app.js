angular
  .module('bookie', ['angularMoment',
                     'ngDialog',
                     'authService',
                     'bookieRoute',
                     'bookService',
                     'postService',
                     'transactionService',
                     'userService'])

  .config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })

  .controller('GlobalCtrl', function($window, $location, Auth) {
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
  })

  .controller('UserCtrl', function($window, $location, User, Auth) {
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
  })

  .controller('UserVerificationCtrl', function($routeParams, User) {
    var vm = this;

    vm.message = null;

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
  })

  .controller('BookIndexCtrl', function (Book) {
    var vm = this;

    Book
      .getAll()
      .then(function (data) {
        vm.books = data;
      }, function (err) {
        console.log(err);
      });
  })

  .controller('BookCtrl', function ($location, Book) {
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
  })

  .controller('BookPostsCtrl', function ($location, $routeParams, Book) {
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
  })

  .controller('PostCtrl', function ($location, Book, Post) {
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
  })

  .controller('MeCtrl', function($scope, ngDialog, User) {
    var vm = this;

    User
      .aboutMe()
      .then(function (data) {
        vm.full_name = data.full_name;
        vm.posts = data.posts;
        vm.subscribed_books = data.subscribed_books;
      }, function (err) {
        console.log(err);
      });

    vm.createTransaction = function (post_id) {
      vm.transaction_post_id = post_id;

      ngDialog.open({
        template: '/app/views/transactions/new.html',
        width: '70%',
        controller: 'TransactionCtrl',
        controllerAs: 'TCtrl',
        className: 'ngdialog-theme-default',
        scope: $scope
      });
    };
  })

  .controller('TransactionCtrl', function(ngDialog, Transaction, User) {
    var vm = this;

    vm.stepClass = ['active', null, null];
    vm.formStatus = null;

    vm.next = function (seller_username) {
      // ngDialog.close();
      vm.formStatus = 'loading';

      User
        .get(seller_username)
        .then(function (user) {
          vm.stepClass = [null, 'active', null];
          vm.formStatus = null;
          vm.errorMessage = null;

          vm.buyer_id = user.id;
          vm.buyer_fullname = user.full_name;
        }, function () {
          vm.formStatus = null;
          vm.errorMessage = "User is not found."
        });
    };

    vm.yes = function (post_id, buyer_id) {
      console.log(post_id);
      console.log(buyer_id);
      Transaction
        .save(post_id, buyer_id)
        .then(function () {
          vm.stepClass = [null, null, 'active'];
        }, function (err) {
          console.log(err);
        })
    };

    vm.no = function () {
      vm.stepClass = ['active', null, null];
    };
  })

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
