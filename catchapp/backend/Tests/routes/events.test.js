
const express = require('express');
const supertest = require('supertest');
const router = require('../../routes/events'); // Import your events router
const Event = require('../../model/event'); // Import your Event model
const User = require('../../model/user'); // Import your User model
const Club = require('../../model/club'); // Import your Club model
const Test = require('supertest/lib/test');
const app = require("../../app");
const { default: mongoose } = require('mongoose');


// Create a test app instance





describe('Event Routes', () => {
  // Test route for GET /events
  
  beforeAll(() => {
    mongoose.connect('mongodb://admin:wael01234@mongo:27017/catch-db?authSource=admin');
});

afterAll(() => {
    mongoose.disconnect();
});

  it('should respond with status 200 for GET /events', async () => {
    const response = await supertest(app).get('/events');
    expect(response.status).toBe(200);
  }, 30000);

  // Test route for GET /events/:id
  it('should respond with status 200 for GET /events/:id', async () => {
    // Create a dummy event
    const event = new Event({
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      location: 'Test Location',
      fee: 0,
      img:'',
      numPlaces: 10,
      organizer: '65d09717bf833d9ba419c84c', // Dummy organizer ID
    });
    await event.save();

    const response = await supertest(app).get(`/events/${event._id}`);
    expect(response.status).toBe(200);

    // Clean up: Delete the dummy event
    await Event.findByIdAndDelete(event._id);
  });

  // Test route for POST /events/add
  it('should respond with status 201 for POST /events/add', async () => {
    // Define request body for creating a new event
    const eventData = {
      title: 'Test Event',
      description: 'Test Description',
      start: new Date(),
      end: new Date(),
      location: 'Test Location',
      fee: 0,
      img:'',
      numPlaces: 10,
      organizer: '65d09717bf833d9ba419c84c', // Dummy organizer ID
    };

    const response = await supertest(app)
      .post('/events/add')
      .send(eventData);
    expect(response.status).toBe(201);

    // Clean up: Delete the created event
    await Event.findByIdAndDelete(response.body._id);
  });

  // Add more tests for other routes as needed
});
