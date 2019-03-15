'use strict'

const Sequalize = require('sequelize')
let sequelize = null
module.export = function setuDatabase (config) {
  if (!sequelize) {
    sequelize = new Sequalize(config)
  }
  return sequelize
}
