const server = require('../../src/server');
const { makeFetch } = require('supertest-fetch');
const fetch = makeFetch(server);

afterAll(() => {
  app.db.truncate();
});

const MOCK_PERSON = {
  name: 'Daiyrbek Artelov',
  age: 25,
  hobbies: ['php', 'laravel', 'vue']
};

const MOCK_UPDATED_DATA = {
  age: 28, // yeah I am that old
  hobbies: ['js', 'nodejs', 'rss']
};

let person;

describe('End-to-End Testing Scenario 3', () => {
  test('it creates a person', async () => {
    const res = await fetch('/person', {
      method: 'POST',
      body: JSON.stringify(MOCK_PERSON),
      headers: { 'Content-Type': 'application/json' }
    }).expect(201);

    person = await res.json();
  });

  test("it updates a person's age and hobbies", async () => {
    const res = await fetch(`/person/${person.id}`, {
      method: 'PUT',
      body: JSON.stringify({ ...MOCK_PERSON, ...MOCK_UPDATED_DATA }),
      headers: { 'Content-Type': 'application/json' }
    }).expect(200);

    person = await res.json();
    expect(person).toEqual(expect.objectContaining(MOCK_UPDATED_DATA));
  });

  test('it should get 2 persons', async () => {
    const res = await fetch(`/person/${person.id}`).expect(200);
    const data = await res.json();
    expect(data.name).toEqual(MOCK_PERSON.name);
    expect(data).toEqual(expect.objectContaining(MOCK_UPDATED_DATA));
  });
});
