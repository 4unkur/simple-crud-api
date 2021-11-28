const server = require('../../src/server');
const { makeFetch } = require('supertest-fetch');
const fetch = makeFetch(server);

afterAll(() => {
  app.db.truncate();
});

const MOCK_PERSON = {
  name: 'Ryan Dahl',
  age: 40,
  hobbies: ['js', 'nodejs', 'deno']
};

let lastPerson;

describe('End-to-End Testing Scenario 2', () => {
  test('it creates 3 persons', async () => {
    await fetch('/person', {
      method: 'POST',
      body: JSON.stringify(MOCK_PERSON),
      headers: { 'Content-Type': 'application/json' }
    }).expect(201);

    await fetch('/person', {
      method: 'POST',
      body: JSON.stringify(MOCK_PERSON),
      headers: { 'Content-Type': 'application/json' }
    }).expect(201);

    const res = await fetch('/person', {
      method: 'POST',
      body: JSON.stringify(MOCK_PERSON),
      headers: { 'Content-Type': 'application/json' }
    }).expect(201);

    lastPerson = await res.json();
  });

  test('it gets 3 persons', async () => {
    const res = await fetch('/person').expect(200);
    const data = await res.json();
    expect(data.length).toBe(3);
  });

  test('it deletes the last person', async () => {
    await fetch(`/person/${lastPerson.id}`, { method: 'DELETE' }).expect(204);
  });

  test('it should get 2 persons', async () => {
    const res = await fetch('/person').expect(200);
    const data = await res.json();
    expect(data.length).toBe(2);
  });
});
