// Database migration
// Useful documentations:
// * http://knexjs.org
// * http://bookshelfjs.org

exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.increments('id').primary(); // user_id
      table.string('username').unique().notNullable();
      table.string('password').notNullable();
      table.string('full_name').notNullable();
      table.boolean('is_verified').notNullable();
    }),

    knex.schema.createTable('books', function(table) {
      table.increments('id').primary(); // book_id
      table.string('title').notNullable().index();
      table.string('author').notNullable();
      table.string('isbn_13').unique();
      table.string('image_url');
    }),

    knex.schema.createTable('posts', function(table) {
      table.increments('id').primary(); // post_id
      table.integer('user_id').references('users.id');
      table.integer('book_id').references('books.id');
      table.text('description');
      table.integer('condition').notNullable();
      table.integer('price').notNullable();
      table.boolean('active').notNullable();
    }),

    knex.schema.createTable('transactions', function(table) {
      table.increments('id').primary(); // transaction_id
      table.integer('seller_id').references('users.id');
      table.integer('buyer_id').references('users.id');
      table.integer('post_id').references('posts.id');
      table.integer('actual_price').notNullable();
      table.integer('rating').notNullable();
      table.text('comment');
    }),

    // Users are interested in buying books
    knex.schema.createTable('books_users', function(table) {
      table.integer('user_id').references('users.id');
      table.integer('book_id').references('books.id');
    }),

    // Email verification
    knex.schema.createTable('user_verifications', function (table) {
      table.integer('user_id').references('users.id');
      table.string('key').notNullable().index();
      table.timestamp('created_at').defaultTo(knex.fn.now());
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.raw('DROP TABLE users CASCADE'),
    knex.raw('DROP TABLE books CASCADE'),
    knex.raw('DROP TABLE posts CASCADE'),
    knex.schema.dropTable('books_users'),
    knex.schema.dropTable('transactions'),
    knex.schema.dropTable('user_verifications')
  ])
};
