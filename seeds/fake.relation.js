
exports.seed = function(knex, Promise) {
  return Promise.join(
    knex('posts').insert({
      // id: 1,
      user_id: 1,
      book_id: 1,
      description: 'like New',
      condition: 5,
      price: 30,
      active: true,
      created_att: new Date('May 1, 2016')
    }),

    knex('posts').insert({
      // id: 2,
      user_id: 12,
      book_id: 1,
      description: 'like new',
      condition: 3,
      price: 23,
      active: true,
      created_att: new Date('October 29, 2015')
    }),

    knex('posts').insert({
      // id: 3,
      user_id: 2,
      book_id: 1,
      description: 'New',
      condition: 4,
      price: 25,
      active: true,
      created_att: new Date('April 30, 2016')
    }),
    
    knex('posts').insert({
      //id: 4,
      user_id: 3,
      book_id: 3,
      description: 'New',
      condition: 5,
      price: 30,
      active: true,
      created_att: new Date('May 18, 2016')
    }),

    knex('posts').insert({
      //id: 5,
      user_id: 3,
      book_id: 2,
      description: 'like new',
      condition: 3,
      price: 25,
      active: true,
      created_att: new Date('March 10, 2016')
    }),

    knex('posts').insert({
      //id: 6,
      user_id: 5,
      book_id: 2,
      description: 'Used 5 times',
      condition: 4,
      price: 30,
      active: true,
      created_att: new Date('March 20, 2016')
    }),

    knex('posts').insert({
      //id: 7,
      user_id: 4,
      book_id: 4,
      description: 'Used for a quarter',
      condition: 3,
      price: 60,
      active: true,
      created_att: new Date('March 20, 2016')
    }),

    knex('posts').insert({
      //id: 8,
      user_id: 6,
      book_id: 2,
      description: 'used a lot',
      condition: 2,
      price: 15,
      active: true,
      created_att: new Date('February 10, 2016')
    }),

    knex('posts').insert({
      //id: 9,
      user_id: 6,
      book_id: 3,
      description: 'used twice',
      condition: 4,
      price: 40,
      active: true,
      created_at: new Date('May 10, 2015')
    }),

    knex('posts').insert({
      //id: 10,
      user_id: 7,
      book_id: 3,
      description: 'Literally falling apart',
      condition: 1,
      price: 1,
      active: true,
      created_at: new Date('January 28, 2016')
    }),

    knex('posts').insert({
      //id: 11,
      user_id: 15,
      book_id: 3,
      description: 'New',
      condition: 5,
      price: 40,
      active: true,
      created_at: new Date('December 25, 2015')
    }),

    knex('posts').insert({
      //id: 12,
      user_id: 10,
      book_id: 2,
      description: 'New',
      condition: 5,
      price: 40,
      active: true,
      created_at: new Date('December 25, 2015')
    }),

    knex('posts').insert({
      //id: 13,
      user_id: 12,
      book_id: 2,
      description: 'Smells real bad',
      condition: 3,
      price: 30,
      active: true,
      created_at: new Date('May 3, 2016')
    }),

    knex('posts').insert({
      //id: 14,
      user_id: 10,
      book_id: 5,
      description: 'at the bottom of the lake',
      condition: 1,
      price: 0,
      active: true,
      created_at: new Date('April 1, 2016')
    }),

    knex('posts').insert({
      //id: 15,
      user_id: 10,
      book_id: 4,
      description: 'Spilled Coffee on it',
      condition: 2,
      price: 20,
      active: true,
      created_at: new Date('April 28, 2016')
    }),

    knex('posts').insert({
      //id: 16,
      user_id: 6,
      book_id: 4,
      description: 'Wow :(',
      condition: 1,
      price: 5,
      active: true,
      created_at: new Date('January 2, 2016')
    }),

    knex('posts').insert({
      //id: 17,
      user_id: 7,
      book_id: 4,
      description: 'Piece of garbage',
      condition: 1,
      price: 20,
      active: true,
      created_at: new Date('April 1, 2016')
    }),

    knex('posts').insert({
      //id: 18,
      user_id: 8,
      book_id: 8,
      description: 'Bonkers',
      condition: 5,
      price: 100,
      active: true,
      created_at: new Date('May 18, 2016')
    }),

    knex('posts').insert({
      //id: 19,
      user_id: 8,
      book_id: 5,
      description: 'Looks crappy',
      condition: 1,
      price: 10,
      active: true,
      created_at: new Date('February 27, 1996')
    }),

    knex('posts').insert({
      //id: 20,
      user_id: 18,
      book_id: 4,
      description: 'brand new',
      condition: 5,
      price: 65,
      active: true,
      created_at: new Date('May 18, 2016')
    })
  ); 
};
