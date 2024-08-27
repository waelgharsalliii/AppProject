const express = require('express');
const supertest = require('supertest');
const router = require('../../routes/users'); // Import your user router
const { default: mongoose } = require('mongoose');
const dayjs = require("dayjs")
// Create a test app instance
const app = express();
app.use(router);

describe('User Routes', () => {

  beforeAll(() => {
    mongoose.connect('mongodb://admin:wael01234@mongo:27017/catch-db?authSource=admin');
});

afterAll(() => {
    mongoose.disconnect();
});

  // Test route for GET /
  it('should respond with status 200 for GET /', async () => {

    const response = await supertest(app).get('/');

    expect(response.status).toBe(200)
  }, 30000); // Increase timeout to 10 seconds
  
  // Test route for POST /add
  it('should respond with status 201 for POST /add', async () => {

    const date = dayjs().toISOString();

    const userData = { fname:"User", lname:"User", birthdate:"03-03-1999", phone:"516546156", email:"drimsdf@sf.sdf", password:"97629888" }
    const response = await supertest(app)
      .post('/signup')
      .field("fname","hh")
      .field("lname","hh")
      .field("email",date+'@gmmail.com')
      .field("birthday","03-03-1999")
      .field("phone","999999999")
      .field("password","987654321");
    expect(response.status).toBe(201)
  },30000);
});
