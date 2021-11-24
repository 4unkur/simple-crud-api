const personController = require('./controllers/person.controller');
const RouteModelKeyService = require('./services/route.model.key.service');

class App {
  constructor(config) {
    this._config = config;
    this.routeModelKeyService = new RouteModelKeyService();
  }

  run(req, res) {
    const method = req.method;
    const url = req.url;

    const id = this.routeModelKeyService.extractUuid(url, '/person');

    if (method === 'GET' && (url === '/person' || url === '/person/')) {
      return personController(this, req, res).index();
    }

    if (method === 'GET' && (url.includes('/person/') && id)) {
      return personController(this, req, res).show(uuid);
    }
  };
}

module.exports = {
  boot(config) {
    return new App(config);
  }
};