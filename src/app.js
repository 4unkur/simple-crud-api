const personController = require('./controllers/person.controller');
const RouteModelKeyService = require('./services/route.model.key.service');
const DB = require('../src/db');
const Response = require('../src/response');

class App {
  constructor(config) {
    this.db = new DB();
    this.config = config;
    this.routeModelKeyService = new RouteModelKeyService();
  }

  set db(db) {
    this._db = db;
  }

  get db() {
    return this._db;
  }

  set config(config) {
    this._config = config;
  }

  get config() {
    return this._config;
  }

  serve() {
    return (req, res) => {
      const urlParts = req.url.split('/');

      const id = this.routeModelKeyService.extractUuid(urlParts, 'person');

      try {
        if (req.method === 'GET' && req.url === '/person') {
          return personController(req, res).fetchAll();
        }

        if (req.method === 'GET' && (req.url.includes('/person/') && id && urlParts.length === 3)) {
          return personController(req, res).fetch(id);
        }

        if (req.method === 'POST' && req.url === '/person') {
          return personController(req, res).create();
        }

        if (req.method === 'PUT' && (req.url.includes('/person/') && id && urlParts.length === 3)) {
          return personController(req, res).update(id);
        }

        if (req.method === 'DELETE' && (req.url.includes('/person/') && id && urlParts.length === 3)) {
          return personController(req, res).delete(id);
        }

        return Response.notFound(res);
      } catch (err) {
        Response.serverError(res);

        process.stderr.write(err);
        process.exit(1);
      }
    };
  };
}

module.exports = App;