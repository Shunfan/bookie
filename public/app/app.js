angular.module('bookie', ['bookieRoute', 'authService', 'userService', 'bookService'])
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
    }
  }])

  .controller('UserCtrl', ['$window', '$location', 'User', 'Auth', function($window, $location, User, Auth) {
    var vm = this;

    vm.signup = function (user) {
      User
        .signup(user)
        .then(function (res) {
          console.log(res);
          $location.path('/login');
        }, function (err) {
          console.log(err);
        });
    };

    vm.login = function (user) {
      Auth
        .login(user.username, user.password)
        .then(function (res) {
          console.log(res);
          $location.path('/');
        }, function (err) {
          console.log(err);
        });
    };
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
  }]);
