'use strict'

const Sequalize = require('sequelize')
const setuDatabase = require('../lib/db')

module.exports = function setupAgenModel (config) {
  const sequalize = setuDatabase(config)

  return sequalize.define('agent', {
    uuid: {
      type: Sequalize.STRING,
      allowNull: false
    },
    username: {
      type: Sequalize.STRING,
      allowNull: false
    },
    name: {
      type: Sequalize.STRING,
      allowNull: false
    },
    pid: {
      type: Sequalize.INTEGER,
      allowNull: false
    },
    conected: {
      type: Sequalize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  })
}
