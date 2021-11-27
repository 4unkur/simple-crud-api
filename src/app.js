const personController = require('./controllers/person.controller');
const DB = require('../src/db');
const Response = require('./utils/response');

class App {
  constructor(config) {
    this.db = new DB();
    this.config = config;
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

      const parts = req.url.match(/\/person\/([a-z0-9-]+$)/);
      let id = null;
      if (parts !== null) {
        id = parts[1];
      }

      try {
        if (req.method === 'GET' && req.url === '/person') {
          return personController(req, res).fetchAll();
        }

        if (req.method === 'GET' && id) {
          return personController(req, res).fetch(id);
        }

        if (req.method === 'POST' && req.url === '/person') {
          return personController(req, res).create()
            .catch(err => Response.error(res, err));
        }

        if (req.method === 'PUT' && id) {
          return personController(req, res).update(id);
        }

        if (req.method === 'DELETE' && id) {
          return personController(req, res).delete(id);
        }

        return Response.notFound(res);
      } catch (err) {
        return Response.error(res, err);
      }
    };
  };
}

module.exports = App;