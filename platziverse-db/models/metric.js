'use strict'

const Sequalize = require('sequelize')
const setuDatabase = require('../lib/db')

module.exports = function setupMetricModel (config) {
  const sequalize = setuDatabase(config)

  return sequalize.define('metric', {
    type: {
      type: Sequalize.STRING,
      allowNull: false
    },
    value: {
      type: Sequalize.TEXT,
      allowNull: false
    }
  })
}
