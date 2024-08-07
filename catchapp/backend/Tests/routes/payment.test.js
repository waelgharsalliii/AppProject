// Import necessary modules
const express = require('express');
const axios = require('axios');
const supertest = require('supertest');
const router = require('../../routes/payment'); // Import your payment router

// Create a test app instance
const app = express();
app.use('/', router);

// Mock axios post and get methods
jest.mock('axios');

describe('Payment Routes', () => {

  
  // Test route for POST /:clubId/:userId/payment
  it('should respond with status 200 for POST /:clubId/:userId/payment', async () => {
    axios.post.mockResolvedValue({ data: 'mock payment data' });

    // Use supertest to make a request to the route
    const response = await supertest(app).post('/:clubId/:userId/payment');

    // Check if the response status is 200 and contains the expected data
    expect(response.status).toBe(200);
    expect(response.body).toEqual({});
  });
});
