angular.module('authService', [])
  .factory('Auth', function ($http, $q, AuthToken) {
    return {
      login: function(username, password) {
        return $http
          .post('/api/authenticate', {
            username: username,
            password: password
          })
          .then(function (res) {
            AuthToken.setToken(res.data.token);
            return res.data
          }, function (err) {
            return $q.reject(err.data);
          });
      },

      logout: function() {
        AuthToken.setToken();
      },

      isLoggedIn: function() {
        return !!AuthToken.getToken();
      }
    }
  })

  .factory('AuthToken', function($window) {
    return {
      getToken: function() {
        return $window.localStorage.getItem('token');
      },

      setToken: function(token) {
        if (token) {
          $window.localStorage.setItem('token', token);
        }
        else{
          $window.localStorage.removeItem('token');
        }
      }
    }
  })

  .factory('AuthInterceptor', function($q, $location, AuthToken) {
    return {
      request: function (config) {
        var token = AuthToken.getToken();

        if (token) {
          config.headers['x-access-token'] = token;
        }

        return config;
      },

      responseError: function (response) {
        if (response.status == 401) {
          $location.path('/login');
        }

        return $q.reject(response);
      }
    }
  });
