// Import necessary modules
const express = require('express');
const supertest = require('supertest');
const router = require('../../routes/chatRoutes'); // Import your chatroom router
const { default: mongoose } = require('mongoose');

// Create a test app instance
const app = express();
app.use('/', router);



describe('Chatroom Routes', () => {

  beforeAll(() => {
    mongoose.connect('mongodb://admin:wael01234@localhost:27017/catch-db?authSource=admin');
});

afterAll(() => {
    mongoose.disconnect();
});

  // Test route for GET /events
  it('should respond with status 200 for GET /', async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
  });


});

