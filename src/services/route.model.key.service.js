const uuid = require('uuid');

class RouteModelKeyService {
  extractUuid(urlParts, modelKey) {

    if (urlParts[1] !== modelKey) {
      return null;
    }

    const id = urlParts[2];

    if (id && uuid.validate(id)) {
      return id;
    }

    return null;
  }
}

module.exports = RouteModelKeyService;