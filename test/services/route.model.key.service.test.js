const RouteModelKeyService = require('../../src/services/route.model.key.service');
const uuid = require('uuid');

const service = new RouteModelKeyService();

describe('route.model.key.service.js test', () => {

  test('it gives null on index route request', () => {
    expect(service.extractUuid('/person'.split('/'), 'person')).toBeNull();
  });

  test('it gives id on show route request', () => {
    const id = uuid.v4();
    expect(service.extractUuid(`/person/${id}`.split('/'), 'person')).toBe(id);
  });

  test('it gives null if id is invalid', () => {
    expect(service.extractUuid('/person/incorrect-uuid-here'.split('/'), 'person')).toBeNull();
  });
});