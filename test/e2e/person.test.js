const server = require('../../src/server');
const { makeFetch } = require('supertest-fetch');

const fetch = makeFetch(server);

describe('End-to-End Testing', () => {
  test('GET /person', async () => {
    await fetch('/person')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .expect([])
  });
});
