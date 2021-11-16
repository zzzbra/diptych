const mapKeys = require('lodash/mapKeys');
const camelCase = require('lodash/camelCase');
const snakeCase = require('lodash/snakeCase');

const camelCaseKeys = (objFromDb) =>
  mapKeys(objFromDb, (_, key) => camelCase(key));

const snakeCaseKeys = (objFromFe) =>
  mapKeys(objFromFe, (_, key) => snakeCase(key));

module.exports = {
  camelCaseKeys,
  snakeCaseKeys,
};
