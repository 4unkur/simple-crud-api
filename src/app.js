const personController = require('./controllers/person.controller');

class App {
  constructor(config) {
    this._config = config;
  }

  run(req, res) {
    const method = req.method;
    const url = req.url;

    if (method === 'GET' && (url === '/person' || url === '/person/')) {
      return personController(this, req, res).index();
    }

    if (method === 'GET' && (url.includes('/person/') && false)) {
      return personController(this, req, res).show(uuid);
    }
  };
}

module.exports = {
  boot(config) {
    return new App(config);
  }
};