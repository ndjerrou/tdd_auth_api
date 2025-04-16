const request = require('supertest');
const app = require('../index');
const connect = require('../db/connection');
const User = require('../users/users.model');
const mongoose = require('mongoose');

beforeAll(async () => {
  //   app.listen(3000, () => console.log('Listenning on port 3000')); ==> unecessary

  await connect();
});

afterAll(async () => {
  await User.deleteMany({});

  await mongoose.disconnect();
});

describe('Test SIGNUP', () => {
  it('Should create a new user', async () => {
    // 201 - User created, sends back a token
    // 400 - Bad request, problem with the incoming body
    // 500 - Error server

    const res = await request(app).post('/auth/signup').send({
      email: 'test@gmail.com',
      password: 'test',
    });

    expect(res.statusCode).toBe(201);
  });

  it('Should return 400 if the body is not valid', async () => {
    const res = await request(app).post('/auth/signup').send({});

    expect(res.statusCode).toBe(400);
  });

  it('Should return 500 in case of a server error', async () => {
    const res = await request(app).post('/auth/signup').send({
      email: 'test1@gmail.com',
      password: 'test1',
    });

    expect(res.statusCode).toBe(500);
  });
});

describe('Test LOGIN', () => {
  // 200 - User connected, sends back a token
  // 400 - Bad request, problem with the incoming body
  // 500 - Error server

  it('Should return 400 if user is not registered', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'test123@gmail.com',
      password: 'test',
    });

    expect(res.statusCode).toBe(400);
  });

  it('Should return 200 if user has an account', async () => {
    const res = await request(app).post('/auth/login').send({
      email: 'test@gmail.com',
      password: 'test',
    });

    expect(res.statusCode).toBe(200);
  });
});
