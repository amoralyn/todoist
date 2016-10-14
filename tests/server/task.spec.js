(() => {
  'use strict';
  const expect = require('expect.js');
  const app = require('./../../server.js');
  const request = require('supertest');
  const faker = require('faker');
  const jwt = require('jsonwebtoken');
  const config = require('./../../server/config/environment.js')

  describe('Tasks', () => {
    let jwtToken;
    let userId;
    let taskId;
    let task;
    let newTask;
    let user;
    let credentials = {
      username: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password()
    };

    before(done => {
      request(app)
        .post('/api/users')
        .send(credentials)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          user = res.body;
          userId = user._id
          jwtToken = jwt.sign({ id: userId }, config.secretKey, {
            expiresIn: 60 * 60 * 24
          });
          task = {
            title: faker.lorem.sentence(),
            description: 'Some content',
            userId: userId
          };

          newTask = {
            title: faker.lorem.sentence(),
            description: 'Some content',
          };
          done();
        });
    });

    it('Should create a new task', (done) => {
      request(app)
        .post('/api/tasks')
        .set('x-access-token', jwtToken)
        .send(task)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          expect(res.body).to.be.an('object');
          expect(res.body.title).to.eql(task.title);
          expect(res.body.description).to.be.a('string');
          done();
        })
    });

    it('Should not create a task without a user id', (done) => {
      request(app)
        .post('/api/tasks')
        .set('x-access-token', jwtToken)
        .send(newTask)
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          let error = res.body.errors.userId.message;
          expect(res.body.message).to.eql('Task validation failed');
          expect(res.body).to.be.an('object');
          expect(error).to.be.eql('UserId is required');
          expect(error).to.be.a('string');
          done();
        })

    })
  })
})();
