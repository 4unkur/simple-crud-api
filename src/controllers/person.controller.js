const PersonRepository = require('../repositories/person.repository');
const Response = require('../response');

class PersonController {
  constructor(req, res) {
    this.req = req;
    this.res = res;

    this.personRepository = new PersonRepository();
  }

  fetchAll() {
    const records = this.personRepository.getAll();

    return Response.ok(this.res, records);
  }

  fetch(id) {
    const record = this.personRepository.get(id);

    if (!record) {
      return Response.notFound(this.res);
    }

    return Response.ok(this.res, record);
  }

  async create() {
    const chunks = [];

    for await (const chunk of this.req) {
      chunks.push(chunk);
    }

    const data = Buffer.concat(chunks).toString();

    const record = this.personRepository.create(JSON.parse(data));

    return Response.created(this.res, record);
  }

  async update(id) {
    const record = this.personRepository.get(id);

    if (!record) {
      return Response.notFound(this.res);
    }

    const chunks = [];

    for await (const chunk of this.req) {
      chunks.push(chunk);
    }

    const data = Buffer.concat(chunks).toString();

    this.personRepository.update(id, JSON.parse(data));
    const updatedRecord = this.personRepository.get(id);

    return Response.ok(this.res, updatedRecord);
  }

  delete(id) {
    const data = this.personRepository.get(id);
    if (!data) {
      return Response.notFound(this.res);
    }

    this.personRepository.delete(id);

    return Response.noContent(this.res);
  }
}

const factory = (req, res) => new PersonController(req, res);

module.exports = factory;
