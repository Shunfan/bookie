exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function(table) {
      table.string('id').primary(); // user_id
      table.string('password');
      table.string('first_name');
      table.string('last_name');
      // table.string('major');
    }),

    knex.schema.createTable('books', function(table) {
      table.integer('id').primary(); // book_id
      table.string('title');
      table.string('author');
    }),

    knex.schema.createTable('posts', function(table) {
      table.increments('id').primary(); // post_id
      table.integer('book_id').references('books.id');
      table.integer('price');
    }),

    knex.schema.createTable('actions', function(table) {
      table.increments('id').primary(); // action_id
      table.integer('book_id').references('books.id');
      table.string('action_name'); // either transaction or watching
      table.date('date');
    }),

    knex.schema.createTable('transactions', function(table) {
      table.increments('id').primary(); // transaction_id
      table.integer('action_id').unique().references('actions.id');
      table.string('seller_id').references('users.id');
      table.string('buyer_id').references('users.id');
      table.integer('price');
      table.integer('rating');
      table.string('comment');
    }),

    knex.schema.createTable('subscribes', function(table) {
      table.increments('id').primary(); // subscribe_id
      table.integer('action_id').unique().references('actions.id');
      table.string('user_id').references('users.id');
    }),

    knex.schema.createTable('users_posts', function(table) {
      table.string('user_id').references('users.id');
      table.integer('post_id').references('posts.id');
    }),

    // Is it necessary?
    knex.schema.createTable('users_books', function(table) {
      table.string('user_id').references('users.id');
      table.integer('book_id').references('books.id');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('books'),
    knex.schema.dropTable('posts'),
    knex.schema.dropTable('actions'),
    knex.schema.dropTable('transactions'),
    knex.schema.dropTable('subscribes'),
    knex.schema.dropTable('users_posts'),
    knex.schema.dropTable('users_books'),
  ])
};
