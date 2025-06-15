const request = require('supertest');
const app = require('../app');
const User = require('../src/models/UserModel');

describe('User Endpoints', () => {
  // Test data
  const testUser = {
    nama: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  };

  // Clean up database before and after tests
  beforeAll(async () => {
    await User.deleteMany({}); // Clear all users
  });

  afterAll(async () => {
    await User.deleteMany({}); // Clean up after tests
  });

  describe('POST /api/users/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send(testUser);

      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('message', 'Registrasi berhasil');
      expect(res.body.data).toHaveProperty('id');
    });

    it('should fail when email is empty', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          nama: testUser.nama,
          password: testUser.password
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Validasi gagal');
      expect(res.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: 'Email wajib diisi'
          })
        ])
      );
    });

    it('should fail when password is less than 6 characters', async () => {
      const res = await request(app)
        .post('/api/users/register')
        .send({
          nama: testUser.nama,
          email: 'short@example.com',
          password: '12345'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Validasi gagal');
      expect(res.body.errors).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            msg: 'Password minimal 6 karakter'
          })
        ])
      );
    });
  });

  describe('POST /api/users/login', () => {
    // Register a user before testing login
    beforeEach(async () => {
      await request(app)
        .post('/api/users/register')
        .send(testUser);
    });

    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });

      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty('success', true);
      expect(res.body).toHaveProperty('token');
      expect(res.body.data).toHaveProperty('email', testUser.email);
    });

    it('should fail when password is incorrect', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body).toHaveProperty('success', false);
      expect(res.body).toHaveProperty('message', 'Email atau password salah');
    });
  });
}); 