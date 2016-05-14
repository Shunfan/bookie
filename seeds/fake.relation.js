
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('posts').insert({
      // id: 1,
      user_id: 1,
      book_id: 1,
      description: 'All new',
      condition: 5,
      price: 30,
      active: true
    }),

    knex('posts').insert({
      // id: 1,
      user_id: 1,
      book_id: 1,
      description: 'like new',
      condition: 3,
      price: 23,
      active: true
    }),

    knex('posts ').insert({
      // id: 2,
      user_id: 2,
      book_id: 1,
      description: 'New',
      condition: 4,
      price: 25,
      active: true
    })
  );
};
