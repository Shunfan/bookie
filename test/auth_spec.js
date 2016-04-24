var knexfile  = require('../knexfile');
var app       = require('../server');
var knex      = require('knex')(knexfile.development);
var supertest = require('supertest')(app);

describe('API - Authentication', function () {
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
            done();
          })
      });
  });

  after(function(done) {
    return knex.migrate.rollback(knexfile)
      .then(function() {
        done();
      });
  });

  describe('POST /authenticate', function() {
    it('should create and return a token if data is valid', function (done) {
      supertest
        .post('/api/authenticate')
        .type('form')
        .send({
          username: 'user1',
          password: 'Password123!@#'
        })
        .expect(201)
        .end(done);
    });

    it('should return a message if username is not found', function (done) {
      supertest
        .post('/api/authenticate')
        .type('form')
        .send({
          username: 'user2',
          password: 'Password123!@#'
        })
        .expect(400, {
          message: 'User is not found'
        })
        .end(done);
    });

    it('should return a message if password is not valid', function (done) {
      supertest
        .post('/api/authenticate')
        .type('form')
        .send({
          username: 'user1',
          password: 'Password'
        })
        .expect(401, {
          message: 'Invalid password'
        })
        .end(done);
    });
  });
});
