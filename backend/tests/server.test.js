import request from 'supertest';
import app from '../server.js';

// Mock mysql2/promise and taskRoutes
jest.mock('mysql2/promise', () => ({
  createPool: jest.fn(() => ({
    execute: jest.fn()
  }))
}));

jest.mock('../routes/taskRoutes.js', () => ({
  default: {
    post: jest.fn((req, res) => res.status(201).json({ id: 1, title: req.body.title, description: req.body.description, completed: false })),
    get: jest.fn((req, res) => res.json([{ id: 1, title: 'Test', completed: false }])),
    put: jest.fn((req, res) => res.status(204).send())
  }
}));

describe('Task API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0); // Random port for testing
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should create a new task', async () => {
    const res = await request(server)
      .post('/api/tasks')
      .send({ title: 'Test Task', description: 'Test Desc' })
      .expect(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('Test Task');
    expect(res.body.completed).toBe(false);
  });

  it('should fetch tasks', async () => {
    const res = await request(server).get('/api/tasks').expect(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toBe('Test');
  });

  it('should mark a task as completed', async () => {
    const res = await request(server)
      .put('/api/tasks/1')
      .expect(204);
  });
});