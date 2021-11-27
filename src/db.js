const uuid = require('uuid');

class DB {
  constructor() {
    this.storage = [];
  }

  select(id = null) {
    if (id) {
      return this.storage.find(record => record.id === id);
    }

    return this.storage;
  }

  insert(data) {
    data['id'] = uuid.v4();

    this.storage.push(data);

    return data;
  }

  update(id, data) {
    const index = this.storage.findIndex(record => record.id === id);
    if (index === -1) {
      return false;
    }

    data.id ??= id;
    this.storage[index] = data;

    return true;
  }

  delete(id) {
    const index = this.storage.findIndex(record => record.id === id);
    if (index === -1) {
      return false;
    }

    this.storage.splice(index, 1);

    return true;
  }

  truncate() {
    this.storage = [];
  }
}

module.exports = DB;