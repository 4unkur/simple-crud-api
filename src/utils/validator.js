const ValidationError = require('../errors/validation.error');

function validatePerson(data) {
  const errors = [];
  if (!data.name) {
    errors.push('Field "name" is required');
  }

  if (data.name && typeof data.name !== 'string') {
    errors.push('Field "name" should be string');
  }

  if (!data.age) {
    errors.push('Field "age" is required');
  }

  if (data.age && (typeof data.age !== 'number')) {
    errors.push('Field "age" should be number');
  }

  if (!data.hobbies) {
    errors.push('Field "hobbies" is required');
  }

  if (!Array.isArray(data.hobbies)) {
    errors.push('Field "hobbies" should be an array');
  }

  if (Array.isArray(data.hobbies) && !data.hobbies.every(hobby => typeof hobby === 'string')) {
    errors.push('Field "hobbies" should be an array of string');
  }

  if (errors.length) {
    throw new ValidationError(errors.join("\n"));
  }
}

module.exports = {
  validatePerson
};