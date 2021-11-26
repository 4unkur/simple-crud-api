class PersonRepository {
  constructor() {
    this.db = global.app.db;
  }

  get(id) {
    return this.db.select(id);
  }

  getAll() {
    return this.db.select();
  }

  create(data) {
    return this.db.insert(data);
  }

  update(id, data) {
    return this.db.update(id, data);
  }

  delete(id) {
    return this.db.delete(id);
  }
}

module.exports = PersonRepository;