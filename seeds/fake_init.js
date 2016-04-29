var config = require('../config');
var bcrypt = require('bcrypt');

exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('posts').del(),
    knex('users').del(),
    knex('books').del(),
    knex('books_users').del(),
    knex('transactions').del(),

    // Inserts seed entries
    knex('users').insert({
      id: 1,
      username: 'admin',
      password: bcrypt.hashSync('admin', config.saltRounds),
      full_name: 'Admin',
      is_verified: true
    }),

    knex('users').insert({
      id: 2,
      username: 'john',
      password: bcrypt.hashSync('password', config.saltRounds),
      full_name: 'Big John',
      is_verified: true
    }),

    knex('books').insert({
      id: 1,
      title: 'Fundamentals of Database Systems (6th Edition)',
      author: 'Ramez Elmasri, Shamkant B. Navathe',
      isbn_13: '978-0136086208',
      image_url: 'http://ecx.images-amazon.com/images/I/41quNI7EQ-L._SX395_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 2,
      title: 'Essentials of Programming Languages (MIT Press)',
      author: 'Daniel P. Friedman, Mitchell Wand',
      isbn_13: '978-0262062794',
      image_url: 'http://ecx.images-amazon.com/images/I/41CDnVJTcKL._SX442_BO1,204,203,200_.jpg'
    }),

    knex('books').insert({
      id: 3,
      title: 'The Scheme Programming Language (MIT Press)',
      author: 'R. Kent Dybvig',
      isbn_13: '978-0262512985',
      image_url: 'http://ecx.images-amazon.com/images/I/51X%2B00UJjcL._SX387_BO1,204,203,200_.jpg'
    })

    // knex('posts').insert({
    //   id: 1,
    //   user_id: 1,
    //   book_id: 1,
    //   description: 'All new',
    //   price: 30,
    //   active: true
    // })

    // knex('posts').insert({
    //   id: 2,
    //   user_id: 2,
    //   book_id: 1,
    //   description: 'New',
    //   price: 25,
    //   active: true
    // })
  );
};
