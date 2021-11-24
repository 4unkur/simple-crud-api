const RouteModelKeyService = require('../../src/services/route.model.key.service');

describe('route.model.key.service.js test', () => {
  test('it gives gives null on index route request', () => {
    const service = new RouteModelKeyService()
    const url = '/person/';

    expect(service.extractUuid(url, '/person')).toBeNull()
  })
})