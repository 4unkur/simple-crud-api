const PersonRepository = require('../../src/repositories/person.repository');
const DB = require('../../src/db');
const uuid = require('uuid');

jest.mock('../../src/db', () => {
  return function () {
    return {
      insert: (table, data) => {
        data['id'] = '';

        return data;
      }
    };
  };
});

const db = new DB();

describe('person repository test', () => {
  const repo = new PersonRepository(db);

  test('it creates a person', () => {
    const data = {};
    const result = repo.create(data);

    delete result.id;

    expect(result).toBe(data);
  });
});