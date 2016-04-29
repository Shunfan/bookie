
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('posts').insert({
      id: 1,
      user_id: 1,
      book_id: 1,
      description: 'All new',
      price: 30,
      active: true
    }),

    knex('posts').insert({
      id: 2,
      user_id: 2,
      book_id: 1,
      description: 'New',
      price: 25,
      active: true
    })
  );
};
