angular.module('postService', []).factory('Post', function ($http, $q) {
  return {
    save: function (post) {
      return $http.post('/api/posts', post)
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        });
    }
  }
});
