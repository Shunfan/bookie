angular.module('transactionService', [])
  .factory('Transaction', function ($http, $q) {
    return {
      save: function (post_id, buyer_id) {
        return $http.post('/api/transactions', {
          post_id: post_id,
          buyer_id: buyer_id
        })
          .then(function (res) {
            return res.data;
          }, function (err) {
            return $q.reject(err.data);
          });
      }
    }
  });
