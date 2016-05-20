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

    get: function (book_id) {
      return $http.get('/api/books/' + book_id)
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        })
    },

    getAll: function () {
      return $http.get('/api/books')
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        })
    },

    getPosts: function (book_id) {
      return $http.get('/api/books/' + book_id + '/posts')
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        })
    },

    getSubscribers: function (book_id) {
      return $http.get('/api/books/' + book_id + '/subscribers')
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        })
    },

    check_subscription: function (book_id) {
      return $http.get('/api/books/' + book_id + '/subscription')
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        })
    },

    subscribe: function (book_id) {
      return $http.put('/api/books/' + book_id + '/subscription', null, null)
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        })
    },

    unsubscribe: function (book_id) {
      return $http.delete('/api/books/' + book_id + '/subscription')
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        })
    },

    getAnalysis: function (book_id) {
      return $http.get('/api/books/' + book_id + '/analysis')
        .then(function (res) {
          return res.data;
        }, function (err) {
          return $q.reject(err.data);
        })
    }
  }
});
