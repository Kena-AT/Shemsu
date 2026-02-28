const request = require('supertest');
const app = require('../src/index');

describe('Authentication Flow', () => {
  let verificationCode;

  it('should fail registration with invalid email', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        fullName: 'Test User',
        email: 'invalid-email',
        password: 'Password123!',
        role: 'buyer'
      });
    
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('errors');
  });

  it('should return 401 for unauthorized profile access', async () => {
    const res = await request(app).get('/api/auth/me');
    expect(res.statusCode).toEqual(401);
  });
});
