angular.module('bookService', []).factory('Book', function ($http, $q) {
  return {
    save: function (book) {
      return $http.post('/api/books', book)
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        });
    },

    getAll: function () {
      return $http.get('/api/books')
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        })
    }
  }
});
