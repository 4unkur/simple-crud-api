const PersonRepository = require('../repositories/person.repository');

class PersonController {
  constructor(req, res) {
    this.req = req;
    this.res = res;

    this.personRepository = new PersonRepository();
  }

  fetchAll() {
    const records = this.personRepository.getAll();

    this.res.writeHead(200, { 'Content-Type': 'application/json' });
    this.res.write(JSON.stringify(records));

    return this.res.end();
  }

  fetch(id) {
    const record = this.personRepository.get(id);

    if (!record) {
      this.res.writeHead(404, { 'Content-Type': 'application/json' });
      this.res.write('Not Found');

      return this.res.end();
    }

    this.res.writeHead(200, { 'Content-Type': 'application/json' });
    this.res.write(JSON.stringify(record));

    return this.res.end();
  }

  async create() {
    const chunks = [];

    for await (const chunk of this.req) {
      chunks.push(chunk);
    }

    const data = Buffer.concat(chunks).toString();

    const record = this.personRepository.create(JSON.parse(data));

    this.res.writeHead(201, { 'Content-Type': 'application/json' });
    this.res.write(JSON.stringify(record));

    return this.res.end();
  }

  async update(id) {
    const record = this.personRepository.get(id);

    if (!record) {
      this.res.writeHead(404, { 'Content-Type': 'application/json' });
      this.res.write('Not Found');

      return this.res.end();
    }

    const chunks = [];

    for await (const chunk of this.req) {
      chunks.push(chunk);
    }

    const data = Buffer.concat(chunks).toString();

    this.personRepository.update(id, JSON.parse(data));
    const updatedRecord = this.personRepository.get(id);

    this.res.writeHead(200, { 'Content-Type': 'application/json' });
    this.res.write(JSON.stringify(updatedRecord));

    return this.res.end();
  }

  delete(id) {
    const data = this.personRepository.get(id);
    if (!data) {
      this.res.writeHead(404, { 'Content-Type': 'application/json' });
      this.res.write('Not Found');

      return this.res.end();
    }

    this.personRepository.delete(id);

    this.res.statusCode = 204;

    return this.res.end();
  }
}

const factory = (req, res) => new PersonController(req, res);

module.exports = factory;
