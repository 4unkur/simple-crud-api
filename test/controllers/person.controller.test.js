const personController = require('../../src/controllers/person.controller');
const httpMocks = require('node-mocks-http');

describe('person controller test', () => {
  test('it fetches all users', () => {
    const reqMock = httpMocks.createRequest();
    const resMock = httpMocks.createResponse();
  });
});