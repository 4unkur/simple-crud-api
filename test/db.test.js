const DB = require('../src/db');

const db = new DB();

describe('DB test', () => {
  beforeEach(() => {
    db.truncate();
  });

  test('it creates table on insert', () => {
    const table = 'test';
    db.insert(table, {});

    expect(db.showTables()).toContain(table);
  });

  test('it inserts data', () => {
    const result = db.insert('test', { name: 'my-name' });

    expect(result).toHaveProperty('name', 'my-name');
    expect(result).toHaveProperty('id');
  });
});