
const request = require('supertest');
const app = require('../server');

describe('Journal API', () => {
    it('should return 401 when getting journals without token', async () => {
    const res = await request(app).get('/api/journals');
    if (res.status === 401 || res.status === 403) return;
    throw new Error('Expected 401 or 403');
  });

  it('should return 401 when creating journal without token', async () => {
    const res = await request(app)
      .post('/api/journals')
      .send({ title: 'Test', content: 'Test content' });
    if (res.status === 401 || res.status === 403) return;
    throw new Error('Expected 401 or 403');
  });
  

  it('should return 401 when deleting journal without token', async () => {
    const res = await request(app)
      .delete('/api/journals/123456789012345678901234');
    if (res.status === 401 || res.status === 403) return;
    throw new Error('Expected 401 or 403');
  });


});