const models = require('./env/production').models;

module.exports.migrations = {
  connection: models.connection
};
