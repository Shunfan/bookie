var knexfile  = require('../knexfile');
var app       = require('../server');
var knex      = require('knex')(knexfile.development);
var supertest = require('supertest')(app);

describe('Bookie API', function () {
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
    it('should create a user with valid data', function (done) {
      supertest
        .post('/api/users')
        .type('form')
        .send({
          username: 'user1',
          password: 'Password123!@#',
          full_name: 'Shunfan Du'
        })
        .expect(201)
        .expect('Content-Type', /json/)
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
        .expect(400)
        .expect('Content-Type', /json/)
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
        .expect(400)
        .expect('Content-Type', /json/)
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
        .expect(400)
        .expect('Content-Type', /json/)
        .end(done);
    });
  });
});
