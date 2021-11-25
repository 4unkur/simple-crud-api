const personController = require('./controllers/person.controller');
const RouteModelKeyService = require('./services/route.model.key.service');

class App {
  constructor(config) {
    this._config = config;
    this.routeModelKeyService = new RouteModelKeyService();
  }

  run(req, res) {
    const method = req.method;
    const urlParts = req.url.split('/');

    const id = this.routeModelKeyService.extractUuid(urlParts, 'person');

    if (method === 'GET' && req.url === '/person') {
      return personController(this, req, res).fetchAll();
    }

    if (method === 'GET' && (req.url.includes('/person/') && id && urlParts.length === 3)) {
      return personController(this, req, res).fetch(id);
    }

    if (method === 'POST' && req.url === '/person') {
      return personController(this, req, res).create();
    }

    if (method === 'DELETE' && (req.url.includes('/person/') && id && urlParts.length === 3)) {
      return personController(this.req, res).delete();
    }

    return 404;
  };
}

module.exports = {
  boot(config) {
    return new App(config);
  }
};