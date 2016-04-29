angular.module('bookieRoute', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl : '/app/views/pages/index.html'
        // controller  : 'MainCtrl',
        // controllerAs: 'MainCtrl'
      })
      .when('/signup', {
        templateUrl: '/app/views/users/signup.html',
        controller: 'UserCtrl',
        controllerAs: 'UserCtrl'
      })
      .when('/login', {
        templateUrl: '/app/views/users/login.html',
        controller: 'UserCtrl',
        controllerAs: 'UserCtrl'
      })
      .when('/books/new', {
        templateUrl: '/app/views/books/new.html',
        controller: 'BookCtrl',
        controllerAs: 'BookCtrl'
      })
      .when('/books', {
        templateUrl: '/app/views/books/index.html',
        controller: 'BookIndexCtrl',
        controllerAs: 'BookIndexCtrl'
      });
    $locationProvider.html5Mode(true);
  }]);
