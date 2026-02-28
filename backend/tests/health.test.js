const request = require('supertest');
const express = require('express');
const app = require('../src/index');

describe('API Health Check', () => {
  it('should return 200 OK from /health', async () => {
    const res = await request('http://localhost:5000').get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });
});
