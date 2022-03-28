const server = require('../../src/server');
const { makeFetch } = require('supertest-fetch');
const fetch = makeFetch(server);
const uuid = require('uuid');

const MOCK_PERSON = { name: 'Ryan Dahl', age: 40, hobbies: ['js', 'nodejs', 'deno'] };

describe('End-to-End Validation Tests', () => {
  test('GET /person/{personId} - should return 400 if invalid personId passed (non-valid uuid)', async () => {
    const res = await fetch(`/person/123123`)
      .expect(400);

    const data = await res.json();
    expect(data.message).toEqual('Invalid UUID');
  });

  test.each([
    [{}, 'name'],
    [{}, 'age'],
    [{}, 'hobbies'],
    [{ age: 'test' }, 'age'], // age should be number
    [{ hobbies: 'test' }, 'hobbies'], // hobbies should be an array
    [{ hobbies: [1, null, {}] }, 'hobbies'], // hobbies should be an array of strings
  ])('POST /person - should return 400 if %j is passed and receive error message with %j field', async (data, errorField) => {
    const res = await fetch('/person', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).expect(400);
    const body = await res.json();
    expect(body.message).toContain(errorField);
  });

  test.each([
    [{}, 'name'],
    [{}, 'age'],
    [{}, 'hobbies'],
    [{ age: 'test' }, 'age'], // age should be number
    [{ hobbies: 'test' }, 'hobbies'], // hobbies should be an array
    [{ hobbies: [1, null, {}] }, 'hobbies'], // hobbies should be an array of strings
  ])('PUT /person - should return 400 if %j is passed and receive error message with %j field', async (data, errorField) => {
    const person = app.db.insert(MOCK_PERSON)
    const res = await fetch(`/person/${person.id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    }).expect(400);
    const body = await res.json();
    expect(body.message).toContain(errorField);
  });

  test('PUT /person/{personId} - should return 400 invalid uuid passed', async () => {
    const res = await fetch('/person/invalid-uuid', {
      method: 'PUT',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    }).expect(400);
    const data = await res.json();
    expect(data.message).toBe('Invalid UUID');
  });

  test('PUT /person/{personId} - should return 404 if non existing person is requested', async () => {
    const id = uuid.v4();
    const res = await fetch(`/person/${id}`, {
      method: 'PUT',
      body: JSON.stringify({}),
      headers: { 'Content-Type': 'application/json' }
    }).expect(404);
    const data = await res.json();
    expect(data.message).toBe('Not Found');
  });

  test('DELETE /person/{personId} - should return 400 invalid uuid passed', async () => {
    const res = await fetch('/person/invalid-uuid', {
      method: 'DELETE',
    }).expect(400);
    const data = await res.json();
    expect(data.message).toBe('Invalid UUID');
  });

  test('DELETE /person/{personId} - should return 404 if non existing person is requested', async () => {
    const id = uuid.v4();
    const res = await fetch(`/person/${id}`, {
      method: 'DELETE',
    }).expect(404);
    const data = await res.json();
    expect(data.message).toBe('Not Found');
  });

  test('it validates invalid json', async () => {
    const person = app.db.insert(MOCK_PERSON)

    const res = await fetch(`/person/${person.id}`, {
      method: 'PUT',
      body: '{invalidjson',
      headers: { 'Content-Type': 'application/json' }
    }).expect(400);
    const body = await res.json();
    expect(body.message).toBe('Invalid JSON');
  });
});
