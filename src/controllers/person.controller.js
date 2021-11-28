const PersonRepository = require('../repositories/person.repository');
const Response = require('../utils/response');
const uuid = require('uuid');
const ValidationError = require('../errors/validation.error');
const validator = require('../utils/validator');

class PersonController {
  constructor(req, res) {
    this.req = req;
    this.res = res;

    this.personRepository = new PersonRepository(global.app.db);
  }

  fetchAll() {
    const records = this.personRepository.getAll();

    return Response.ok(this.res, records);
  }

  fetch(id) {
    if (!uuid.validate(id)) {
      throw new ValidationError('Invalid UUID');
    }

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

    try {
      const data = JSON.parse(Buffer.concat(chunks).toString());
    } catch (err) {
      throw new ValidationError('Invalid JSON');
    }

    validator.validatePerson(data);

    const record = this.personRepository.create(data);

    return Response.created(this.res, record);
  }

  async update(id) {
    if (!uuid.validate(id)) {
      throw new ValidationError('Invalid UUID');
    }

    const record = this.personRepository.get(id);

    if (!record) {
      return Response.notFound(this.res);
    }

    const chunks = [];

    for await (const chunk of this.req) {
      chunks.push(chunk);
    }

    try {
      const data = JSON.parse(Buffer.concat(chunks).toString());
    } catch (err) {
      throw new ValidationError('Invalid JSON');
    }

    validator.validatePerson(data);

    this.personRepository.update(id, parsed);
    const updatedRecord = this.personRepository.get(id);

    return Response.ok(this.res, updatedRecord);
  }

  delete(id) {
    if (!uuid.validate(id)) {
      throw new ValidationError('Invalid UUID');
    }

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
