
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('posts').insert({
      // id: 1,
      user_id: 1,
      book_id: 1,
      description: 'All new',
      condition: 5,
      price: 30,
      active: true,
      created_at: new Date('May 1, 2016')
    }),

    knex('posts').insert({
      // id: 2,
      user_id: 1,
      book_id: 1,
      description: 'like new',
      condition: 3,
      price: 23,
      active: true,
      created_at: new Date('October 29, 2015')
    }),

    knex('posts').insert({
      // id: 3,
      user_id: 2,
      book_id: 1,
      description: 'New',
      condition: 4,
      price: 25,
      active: true,
      created_at: new Date('April 30, 2016')
    })
  );
};
