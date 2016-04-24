// Database migration
// Useful documentations:
// * http://knexjs.org
// * http://bookshelfjs.org

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary(); // user_id
      table.string('username');
      table.string('password');
      table.string('first_name');
      table.string('last_name');
    }),

    knex.schema.createTable('books', function(table) {
      table.increments('id').primary(); // book_id
      table.string('title');
      table.string('author');
    }),

    knex.schema.createTable('posts', function(table) {
      table.increments('id').primary(); // post_id
      table.integer('user_id').references('users.id');
      table.integer('book_id').references('books.id');
      table.string('description');
      table.integer('price');
      table.boolean('active');
    }),

    knex.schema.createTable('transactions', function(table) {
      table.increments('id').primary(); // transaction_id
      table.integer('seller_id').references('users.id');
      table.integer('buyer_id').references('users.id');
      table.integer('post_id').references('posts.id');
      table.integer('actual_price');
      table.integer('rating');
      table.string('comment');
    }),

    // Users are interested in buying books
    knex.schema.createTable('books_users', function(table) {
      table.integer('user_id').references('users.id');
      table.integer('book_id').references('books.id');
    }),

    // Users complete transactions on a post
    knex.schema.createTable('posts_transactions_users', function(table) {
      table.integer('seller_id').references('users.id');
      table.integer('buyer_id').references('users.id');
      table.integer('post_id').references('posts.id');
      table.integer('transaction_id').references('transactions.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('books'),
    knex.schema.dropTable('posts'),
    knex.schema.dropTable('transactions'),
    knex.schema.dropTable('books_users'),
    knex.schema.dropTable('posts_transactions_users')
  ])
};
