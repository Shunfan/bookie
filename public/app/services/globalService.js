angular.module('globalService', []).factory('Global', function ($http, $q) {
  return {
    getStatistics: function () {
      return $http.get('/api/statistics')
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        });
    }
  }
});
