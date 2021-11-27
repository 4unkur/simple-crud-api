const PersonRepository = require('../../src/repositories/person.repository');
const DB = require('../../src/db');

jest.mock('../../src/db', () => {
  return function () {
    return {
      insert: (data) => data
    };
  };
});

const db = new DB();

describe('person repository test', () => {
  const repo = new PersonRepository(db);

  test('it creates a person', () => {
    const data = {};
    const result = repo.create(data);

    expect(result).toBe(data);
  });
});