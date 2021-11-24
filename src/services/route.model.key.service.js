const { v4: uuid, validate: uuidValidator } = require('uuid')
class RouteModelKeyService {
  constructor() {

  }
  extractUuid(url, modelKey) {
    const id = url.split('/')
      .filter(part => part !== '' && part !== modelKey)
      .join('/');

    if (!uuidValidator(id)) {
      return null;
    }

    return id;
  }
}

module.exports = RouteModelKeyService;