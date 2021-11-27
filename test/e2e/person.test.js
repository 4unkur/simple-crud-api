const server = require('../../src/server');
const { makeFetch } = require('supertest-fetch');
const uuid = require('uuid');
const fetch = makeFetch(server);

const MOCK_PERSON = { name: 'Ryan Dahl', age: 40, hobbies: ['js', 'nodejs', 'deno'] };

describe('End-to-End Testing', () => {
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

    const body = await res.json();
    expect(uuid.validate(body.id)).toBeTruthy();
    delete body.id;
    expect(body).toEqual(MOCK_PERSON);
  });

  test('GET /person/{personId} - should return person by personId', async () => {
    const person = app.db.insert(MOCK_PERSON);
    const result = await fetch(`/person/${person.id}`)
      .expect(200)
      .expect('Content-Type', 'application/json')
      .json();

    expect(result).toEqual(person);
  });

  test('PUT /person/{personId} - should update a person and return updated versin', async () => {
    const person = app.db.insert(MOCK_PERSON);
    const MOCK_UPDATED_PERSON = {
      name: 'Edited name',
      age: 100500,
      hobbies: ['php', 'is', 'the', 'best']
    };

    const res = await fetch(`/person/${person.id}`, {
      method: 'PUT',
      body: JSON.stringify(MOCK_UPDATED_PERSON),
      headers: { 'Content-Type': 'application/json' }
    }).expect(200);

    const body = await res.json();
    expect(uuid.validate(body.id)).toBeTruthy();
    expect(body).toEqual({id: person.id, ...MOCK_UPDATED_PERSON});
  });
});
