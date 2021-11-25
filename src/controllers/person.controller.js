class PersonController {
  constructor(req, res) {
    this.req = req;
    this.res = res;

    this.personRepository = new PersonRepository();
  }

  fetchAll() {
    this.res.write('all users here');
    this.res.end();
  }

  fetch(id) {

  }

  create(data) {

  }

  delete(id) {

  }
}

const factory = (req, res) => new PersonController(req, res);

module.exports = factory;
