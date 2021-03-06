const server = require('../../src/server');
const { makeFetch } = require('supertest-fetch');
const uuid = require('uuid');
const fetch = makeFetch(server);

const MOCK_PERSON = {
  name: 'Ryan Dahl',
  age: 40,
  hobbies: ['js', 'nodejs', 'deno']
};

const MOCK_UPDATED_PERSON = {
  name: 'Edited name',
  age: 100500,
  hobbies: ['php', 'is', 'the', 'best'] // 😉
};

afterAll(() => {
  app.db.truncate();
});

let person;

describe('End-to-End Testing Scenario 1', () => {
  test('GET /person - should return array', async () => {
    await fetch('/person')
      .expect(200)
      .expect('Content-Type', 'application/json')
      .expect([]);
  });

  test('POST /person - should create a person and return the record', async () => {
    const res = await fetch('/person', {
      method: 'POST',
      body: JSON.stringify(MOCK_PERSON),
      headers: { 'Content-Type': 'application/json' }
    }).expect(201);

    person = await res.json();
    expect(uuid.validate(person.id)).toBeTruthy();
    expect(person).toEqual(expect.objectContaining(MOCK_PERSON));
  });

  test('GET /person/{personId} - should return person by personId', async () => {
    const result = await fetch(`/person/${person.id}`)
      .expect(200)
      .expect('Content-Type', 'application/json')
      .json();

    expect(result).toEqual(person);
  });

  test('PUT /person/{personId} - should update a person and return updated version', async () => {
    const res = await fetch(`/person/${person.id}`, {
      method: 'PUT',
      body: JSON.stringify(MOCK_UPDATED_PERSON),
      headers: { 'Content-Type': 'application/json' }
    }).expect(200);

    const body = await res.json();
    expect(uuid.validate(body.id)).toBeTruthy();
    expect(body).toEqual(expect.objectContaining(MOCK_UPDATED_PERSON));
  });

  test('DELETE /person/{personId} - should delete a person', async () => {
    await fetch(`/person/${person.id}`, {
      method: 'DELETE'
    }).expect(204);

    expect(app.db.select(person.id)).toBeUndefined();
  });

  test('GET /person/{personId} - should return 404 if removed (non existing) person requested', async () => {
    const res = await fetch(`/person/${person.id}`)
      .expect(404);

    const data = await res.json();
    expect(data.message).toEqual('Not Found');
  });
});
