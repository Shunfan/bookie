var knexfile  = require('../knexfile');
var app       = require('../server');
var knex      = require('knex')(knexfile.development);
var supertest = require('supertest')(app);

describe('API - User', function () {
  before(function (done) {
    return knex.migrate.latest(knexfile)
      .then(function() {
        done();
      });
  });

  after(function(done) {
    return knex.migrate.rollback(knexfile)
      .then(function() {
        done();
      });
  });

  describe('POST /users', function() {
    it('should create a user if data is valid', function (done) {
      supertest
        .post('/api/users')
        .type('form')
        .send({
          username: 'user1',
          password: 'Password123!@#',
          full_name: 'Shunfan Du'
        })
        .expect(201, {
          success: true
        })
        .end(done);
    });

    it('should return a message if username exists', function (done) {
      supertest
        .post('/api/users')
        .type('form')
        .send({
          username: 'user1',
          password: 'Password123!@#',
          full_name: 'Shunfan Du'
        })
        .expect(400, {
          message: {
            username: 'Username already exists'
          }
        })
        .end(done);
    });

    it('should return a message if username is empty', function (done) {
      supertest
        .post('/api/users')
        .type('form')
        .send({
          username: '',
          password: 'Password123!@#',
          full_name: 'Shunfan Du'
        })
        .expect(400, {
          "message": {
            "username": "The username is required"
          }
        })
        .end(done);
    });

    it('should return a message if password is empty', function (done) {
      supertest
        .post('/api/users')
        .type('form')
        .send({
          username: 'user1',
          password: '',
          full_name: 'Shunfan Du'
        })
        .expect(400, {
          "message": {
            "password": "The password is required"
          }
        })
        .end(done);
    });

    it('should return a message if the length of password is less than 5', function (done) {
      supertest
        .post('/api/users')
        .type('form')
        .send({
          username: 'user1',
          password: 'Pass',
          full_name: 'Shunfan Du'
        })
        .expect(400, {
          "message": {
            "password": "The password must be at least 5 characters long"
          }
        })
        .end(done);
    });

    it('should return a message if full name is empty', function (done) {
      supertest
        .post('/api/users')
        .type('form')
        .send({
          username: 'user1',
          password: 'Password123!@#',
          full_name: ''
        })
        .expect(400, {
          "message": {
            "full_name": "The full_name is required"
          }
        })
        .end(done);
    });
  });
});
