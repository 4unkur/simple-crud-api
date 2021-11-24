const uuid = require('uuid');

class RouteModelKeyService {
  extractUuid(url, modelKey) {
    const id = url.split('/')
      .filter(part => part !== '' && part !== modelKey)
      .join('/');

    if (!uuid.validate(id)) {
      return null;
    }

    return id;
  }
}

module.exports = RouteModelKeyService;