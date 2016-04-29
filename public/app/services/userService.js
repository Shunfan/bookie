angular.module('userService', []).factory('User', function ($http, $q) {
  return {
    signup: function (user) {
      return $http.post('/api/users', user)
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        });
    }
  }
});
