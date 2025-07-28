import request from 'supertest';
import app from '../server.js';

// Mock mysql2/promise
const mockQuery = jest.fn();
jest.mock('mysql2/promise', () => ({
  createConnection: jest.fn(() => ({
    query: mockQuery,
    end: jest.fn()
  })),
  createPool: jest.fn(() => ({
    query: mockQuery,
    end: jest.fn()
  }))
}));

// Mock taskRoutes
jest.mock('../routes/taskRoutes.js', () => ({
  default: {
    post: jest.fn(async (req, res) => {
      if (!req.body.title) return res.status(400).json({ error: 'Title is required' });
      mockQuery.mockResolvedValue([{ insertId: 1 }]);
      res.status(201).json({ id: 1, title: req.body.title, description: req.body.description, completed: false });
    }),
    get: jest.fn(async (req, res) => {
      mockQuery.mockResolvedValue([{ id: 1, title: 'Test', completed: false }]);
      res.json([{ id: 1, title: 'Test', completed: false }]);
    }),
    put: jest.fn(async (req, res) => {
      if (!req.params.id) return res.status(400).json({ error: 'ID is required' });
      mockQuery.mockResolvedValue();
      res.status(204).send();
    })
  }
}));

describe('Task API', () => {
  let server;

  beforeAll(() => {
    server = app.listen(0);
  });

  afterAll((done) => {
    server.close(done);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Existing Suite: Basic CRUD
  describe('Basic CRUD Operations', () => {
    it('should create a new task', async () => {
      const res = await request(server)
        .post('/api/tasks')
        .send({ title: 'Test Task', description: 'Test Desc' })
        .expect(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.title).toBe('Test Task');
      expect(res.body.completed).toBe(false);
      expect(mockQuery).toHaveBeenCalledWith(expect.any(String), expect.any(Array));
    });

    it('should fetch tasks', async () => {
      const res = await request(server).get('/api/tasks').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body[0].title).toBe('Test');
      expect(mockQuery).toHaveBeenCalledWith(expect.any(String), []);
    });

    it('should mark a task as completed', async () => {
      const res = await request(server)
        .put('/api/tasks/1')
        .expect(204);
      expect(mockQuery).toHaveBeenCalledWith(expect.any(String), [1]);
    });
  });

  // New Suite: Error Handling
  describe('Error Handling', () => {
    it('should handle database connection failure', async () => {
      mockQuery.mockRejectedValue(new Error('Database error'));
      const res = await request(server)
        .post('/api/tasks')
        .send({ title: 'Test Task' })
        .expect(500); // Assuming a catch-all error response
      expect(res.body.error).toBeDefined();
    });

    it('should handle invalid route', async () => {
      const res = await request(server).get('/api/invalid').expect(404);
      expect(res.body).toEqual({});
    });
  });

  // New Suite: Validation
  describe('Input Validation', () => {
    it('should reject task creation without title', async () => {
      const res = await request(server)
        .post('/api/tasks')
        .send({ description: 'No title' })
        .expect(400);
      expect(res.body.error).toBe('Title is required');
    });

    it('should reject update with invalid ID', async () => {
      const res = await request(server)
        .put('/api/tasks/invalid')
        .expect(400);
      expect(res.body.error).toBe('ID is required');
    });
  });

  // New Suite: Edge Cases
  describe('Edge Cases', () => {
    it('should handle empty task list', async () => {
      mockQuery.mockResolvedValue([]);
      const res = await request(server).get('/api/tasks').expect(200);
      expect(res.body).toEqual([]);
    });

    it('should limit to 5 tasks', async () => {
      mockQuery.mockResolvedValue(Array(6).fill().map((_, i) => ({ id: i + 1, title: `Task ${i + 1}`, completed: false })));
      const res = await request(server).get('/api/tasks').expect(200);
      expect(res.body.length).toBe(5);
    });
  });
});