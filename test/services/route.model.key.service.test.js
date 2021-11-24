const RouteModelKeyService = require('../../src/services/route.model.key.service');
const uuid = require('uuid');

const service = new RouteModelKeyService();

describe('route.model.key.service.js test', () => {

  test.each(['/person', '/person/'])('it gives null on index route request', (url) => {
    expect(service.extractUuid(url, 'person')).toBeNull();
  });

  test('it gives id on show route request', () => {
    const uuid1 = uuid.v4();
    expect(service.extractUuid(`/person/${uuid1}`, 'person')).toBe(uuid1);
    expect(service.extractUuid(`/person/${uuid1}/`, 'person')).toBe(uuid1);
  });
});