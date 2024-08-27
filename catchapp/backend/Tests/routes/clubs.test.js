jest.setTimeout(60000); // 30 seconds

const express = require('express');
const supertest = require('supertest');
const mongoose = require('mongoose');
const Club = require("../../model/club");
const app = require('../../app');
const dayjs = require('dayjs');

let clubId;

describe('Club Routes', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://admin:wael01234@localhost:27017/catch-db?authSource=admin', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    // Create a club to use in tests
    const club = new Club({
      name: 'Test Club',
      description: 'Test Description',
      address: 'Test Address',
      domain: 'Test Domain'
    });

    const savedClub = await club.save();
    clubId = savedClub._id.toString();
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it('should respond with status 200 for GET /clubs', async () => {
    const response = await supertest(app).get('/clubs');
    expect(response.status).toBe(200);
  });

  it('should respond with status 201 for POST /clubs/add', async () => {
    const date = dayjs().toISOString();
    const response = await supertest(app)
      .post('/clubs/add')
      .send({
        name: date,
        description: "zerzerezr",
        address: "azeaze",
        domain: date
      });
    expect(response.status).toBe(201);
  });

  it('should respond with status 200 for GET /clubs/:id', async () => {
    const response = await supertest(app).get(`/clubs/${clubId}`);
    expect(response.status).toBe(200);
  });

  it('should respond with status 200 for PUT /clubs/update/:id', async () => {
    const response = await supertest(app)
      .put(`/clubs/update/${clubId}`)
      .send({
        name: 'Updated Club Name',
        description: 'Updated description',
        address: 'Updated address',
        domain: 'Updated domain'
      });
    expect(response.status).toBe(200);
  });

  it('should respond with status 200 for DELETE /clubs/delete/:id', async () => {
    const response = await supertest(app).delete(`/clubs/delete/${clubId}`);
    expect(response.status).toBe(200);
  });
});
