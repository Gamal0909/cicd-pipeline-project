const request = require('supertest');
let server;

beforeEach(() => {
  delete require.cache[require.resolve('./server')];
  const app = require('./server');
  server = app.listen(0);
});

afterEach((done) => {
  server.close(done);
});

describe('API Endpoints', () => {
  test('GET / returns app info', async () => {
    const res = await request(server).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body).toHaveProperty('version');
  });

  test('GET /health returns healthy status', async () => {
    const res = await request(server).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
  });
});
