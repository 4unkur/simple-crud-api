const Person = require('../models/person');

class PersonRepository {
  constructor(db) {
    this.db = db;
  }

  get(id) {
    return this.db.select(Person.table, id);
  }

  getAll() {
    return this.db.select(Person.table);
  }

  create(data) {
    return this.db.insert(Person.table, data);
  }

  update(id, data) {
    return this.db.update(Person.table, id, data);
  }

  delete(id) {
    return this.db.delete(Person.table, id);
  }
}

module.exports = PersonRepository;