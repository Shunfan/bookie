var knexfile  = require('../knexfile');
var app       = require('../server');
var knex      = require('knex')(knexfile.development);
var supertest = require('supertest')(app);

describe('API - Book', function () {
  var token;

  before(function (done) {
    return knex.migrate.latest(knexfile)
      .then(function() {
        supertest
          .post('/api/users')
          .type('form')
          .send({
            username: 'user1',
            password: 'Password123!@#',
            full_name: 'Shunfan Du'
          })
          .then(function () {
            supertest
              .post('/api/authenticate')
              .type('form')
              .send({
                username: 'user1',
                password: 'Password123!@#'
              })
              .then(function (res) {
                token = res.body.token;
                done();
              })
          })
      });
  });

  after(function (done) {
    return knex.migrate.rollback(knexfile)
      .then(function () {
        done();
      });
  });

  describe('POST /book', function () {
    it('should create a book if data is valid', function (done) {
      supertest
        .post('/api/books')
        .type('form')
        .send({
          title: 'Book title',
          author: 'Main Author',
          isbn_13: '1111111111111',
          image_url: 'http://example.com/example.jpg',
          token: token
        })
        .expect(201, {
          success: true
        })
        .end(done);
    });

    it('should return a message if title is empty', function (done) {
      supertest
        .post('/api/books')
        .type('form')
        .send({
          title: '',
          author: 'Main Author',
          isbn_13: '1111111111111',
          image_url: 'http://example.com/example.jpg',
          token: token
        })
        .expect(400)
        .end(done);
    });
  });
});
