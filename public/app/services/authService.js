angular.module('authService', [])
  .factory('Auth', function ($http, $q, AuthToken, AuthUsername) {
    return {
      login: function(username, password) {
        return $http
          .post('/api/authenticate', {
            username: username,
            password: password
          })
          .then(function (res) {
            AuthToken.setToken(res.data.token);

            $http
              .get('/api/user')
              .then(function (res) {
                AuthUsername.setUsername(res.data.username);
            });
          }, function (err) {
            return $q.reject(err.data);
          });
      },

      logout: function() {
        AuthToken.setToken();
        AuthUsername.setUsername();
      },

      getUsername: function () {
        return AuthUsername.getUsername();
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

  .factory('AuthUsername', function($window) {
    return {
      getUsername: function() {
        return $window.localStorage.getItem('username');
      },

      setUsername: function(username) {
        if (username) {
          $window.localStorage.setItem('username', username);
        }
        else{
          $window.localStorage.removeItem('username');
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
