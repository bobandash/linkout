const request = require('supertest');
const express = require('express');
const usersRouter = require('../users');
const {
  initializeMongoServer,
  deleteMongoServer,
} = require('../../config/databaseTesting.config');
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/users', usersRouter);

beforeAll(async () => {
  await initializeMongoServer();
});

afterEach(async () => {
  await deleteMongoServer();
});

describe('Test user API', () => {
  describe('POST /users/create', () => {
    it('should create user with valid data', async () => {
      const response = await request(app)
        .post('/users/create')
        .type('form')
        .send({
          email: 'testing@gmail.com',
          password: 'ipisJn8I4A2Mx7Q!',
          confirmPassword: 'ipisJn8I4A2Mx7Q!',
        });
      expect(response.status).toEqual(200);
    });

    it(`should send error message when email already exists`, async () => {
      await request(app).post('/users/create').type('form').send({
        email: 'testing@gmail.com',
        password: 'ipisJn8I4A2Mx7Q!',
        displayName: 'Test',
        confirmPassword: 'ipisJn8I4A2Mx7Q!',
      });
      const response = await request(app)
        .post('/users/create')
        .type('form')
        .send({
          email: 'testing@gmail.com',
          password: 'ipisJn8I4A2Mx7Q!',
          confirmPassword: 'ipisJn8I4A2Mx7Q!',
        });
      expect(response.status).toEqual(400);
    });

    it(`should send error message when confirm password doesn't match password`, async () => {
      const response = await request(app)
        .post('/users/create')
        .type('form')
        .send({
          email: 'testing@gmail.com',
          password: 'ipisJn8I4A2Mx7Q!',
          confirmPassword: 'test',
        });
      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        confirmPassword: {
          msg: 'Passwords do not match',
        },
      });
    });

    it(`should send error message when password and username don't match`, async () => {
      const response = await request(app)
        .post('/users/create')
        .type('form')
        .send({
          email: 'testing',
          password: '123!',
          confirmPassword: '123!',
        });
      expect(response.status).toEqual(400);
      expect(response.body).toEqual({
        email: {
          msg: 'Email already has an account',
          location: 'body',
          msg: 'Email is invalid',
          path: 'email',
          type: 'field',
          value: 'testing',
        },
        password: {
          location: 'body',
          msg: 'Password has to be at least 8 characters, 1 uppercase, and 1 symbol',
          path: 'password',
          type: 'field',
          value: '123!',
        },
      });
    });
  });
});
