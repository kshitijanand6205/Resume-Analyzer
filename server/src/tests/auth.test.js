import { register, login } from '../controllers/auth.controller.js';
import pool from '../config/db.js';

jest.mock('../config/db.js');

describe('Auth Controller', () => {
  afterEach(() => jest.clearAllMocks());

  test('register creates user', async () => {
    pool.execute.mockResolvedValue([{ insertId: 1 }]);
    const req = { body: { email: 'test@example.com', password: 'pass' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await register(req, res, jest.fn());
    expect(res.status).toHaveBeenCalledWith(201);
  });

  // more tests for login, etc will be available soon.
});