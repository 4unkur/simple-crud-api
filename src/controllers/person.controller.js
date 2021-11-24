class PersonController {
  constructor(app, req, res) {
    this.app = app;
    this.req = req;
    this.res = res;
  }

  fetchAll() {
    this.res.write('all users here');
    this.res.end();
  }

  fetch(id) {

  }

  create() {

  }
}

const factory = (app, req, res) => new PersonController(app, req, res);

module.exports = factory;
