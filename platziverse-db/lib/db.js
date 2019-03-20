'use strict'
// cuenta cuenta
// consulta sql = CREATE ROLE cuenta WITH LOGIN PASSWORD 'cuenta';
// CREATE DATABASE platziverse;
// GRANT ALL PRIVILEGES ON DATABASE platziverse TO andrea

const Sequalize = require('sequelize')
let sequelize = null
module.exports = function setuDatabase (config) {
  if (!sequelize) {
    sequelize = new Sequalize(config)
  }
  return sequelize
}
