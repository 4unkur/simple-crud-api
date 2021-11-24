const uuid = require('uuid');

class DB {
  constructor() {
    this.storage = [];
  }

  showTables() {
    return Object.keys(this.storage);
  }

  select(table, id = null) {
    if (id) {
      return this.storage[table].find(record => record.id === id);
    }

    return this.storage[table];
  }

  insert(table, data) {
    if (this.storage[table] === undefined) {
      this.storage[table] = [];
    }

    data['id'] = uuid.v4();

    this.storage[table].push(data);

    return data;
  }

  update(table, id, data) {

  }

  delete(table, id) {

  }

  truncate() {
    this.storage = [];
  }
}

module.exports = DB;