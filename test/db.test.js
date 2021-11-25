const DB = require('../src/db');

const db = new DB();

describe('DB test', () => {
  beforeEach(() => {
    db.truncate();
  });

  test('it inserts data', () => {
    const result = db.insert({ name: 'my-name' });

    expect(result).toHaveProperty('name', 'my-name');
    expect(result).toHaveProperty('id');
  });

  test('it updates data', () => {
    const MOCK_DATA = {
      id: 69,
      name: 'test'
    };

    db.storage = [MOCK_DATA];

    const result = db.update(MOCK_DATA.id, { name: 'edited' });
    const data = db.select(MOCK_DATA.id);

    expect(result).toBeTruthy();
    expect(data.name).toBe('edited');
  });

  test('it deletes data', () => {
    const MOCK_DATA = {
      id: 69,
      name: 'test'
    };

    db.storage = [MOCK_DATA];
    const res = db.delete(69);

    expect(res).toBeTruthy();
    expect(db.select()).toEqual([]);
  });
});