angular.module('userService', [])
  .factory('User', function ($http, $q) {
    return {
      signup: function (user) {
        return $http.post('/api/users', user)
          .then(function (res) {
            return res.data;
          }, function (err) {
            return $q.reject(err.data);
          });
      },

      verify: function (key) {
        return $http.post('/api/users/verify', {key: key})
          .then(function (res) {
            return res.data;
          }, function (err) {
            return $q.reject(err.data);
          });
      },

      aboutMe: function () {
        return $http.get('/api/user')
          .then(function (res) {
            return res.data;
          }, function (err) {
            return $q.reject(err.data);
          });
      },

      get: function (username) {
        return $http.get('/api/users/' + username)
          .then(function (res) {
            return res.data;
          }, function (err) {
            return $q.reject(err.data);
          });
      }
    }
  });
