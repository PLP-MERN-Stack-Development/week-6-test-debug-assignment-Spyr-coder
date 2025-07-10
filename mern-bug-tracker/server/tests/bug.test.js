const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../index');
const Bug = require('../models/Bug');

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async () => {
  await Bug.deleteMany(); // Clean DB after each test
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Bug Tracker API', () => {
  it('should create a new bug', async () => {
    const res = await request(app)
      .post('/api/bugs')
      .send({
        title: 'Sample bug',
        description: 'Something broke'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Sample bug');
    expect(res.body.status).toBe('open');
  });

  it('should get all bugs', async () => {
    await Bug.create({ title: 'Bug A', description: 'Test A' });
    const res = await request(app).get('/api/bugs');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a bug\'s status', async () => {
    const bug = await Bug.create({ title: 'Bug B' });

    const res = await request(app)
      .put(`/api/bugs/${bug._id}`)
      .send({ status: 'resolved' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('resolved');
  });

  it('should delete a bug', async () => {
    const bug = await Bug.create({ title: 'Bug C' });

    const res = await request(app).delete(`/api/bugs/${bug._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted/i);
  });
});

