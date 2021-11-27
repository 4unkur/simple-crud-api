const server = require('../../src/server');
const { makeFetch } = require('supertest-fetch');
const fetch = makeFetch(server);

describe('e2e validation tests', () => {
  test('GET /person/{personId} - should return 400 if invalid personId passed (non-valid uuid)', async () => {
    const res = await fetch(`/person/123123`)
      .expect(400);

    const message = await res.text();
    expect(message).toEqual('Invalid UUID');
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
    const message = await res.text();
    expect(message).toContain(errorField);
  });
});
