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
      .when('/books', {
        templateUrl: '/app/views/books/index.html',
        controller: 'BookIndexCtrl',
        controllerAs: 'BookIndexCtrl'
      })
      .when('/books/new', {
        templateUrl: '/app/views/books/new.html',
        controller: 'BookCtrl',
        controllerAs: 'BookCtrl'
      })
      .when('/books/:book_id/posts', {
        templateUrl: '/app/views/books/posts.html',
        controller: 'BookPostsCtrl',
        controllerAs: 'BookPostsCtrl'
      })
      .when('/posts/new', {
        templateUrl: '/app/views/posts/new.html',
        controller: 'PostCtrl',
        controllerAs: 'PostCtrl'
      });
    $locationProvider.html5Mode(true);
  }]);
