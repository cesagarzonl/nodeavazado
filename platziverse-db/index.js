'use strict'

const setupDatabase = require('./lib/db')
const setupAgenteModel = require('./models/agente')
const setupModelsModel = require('./models/metric')
const setupAgent = require('./lib/agent')
const defautls = require('defaults')

module.exports = async function (config) {
  config = defautls(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const AgenteModel = setupAgenteModel(config)
  const MetricsModel = setupModelsModel(config)

  AgenteModel.hasMany(MetricsModel)
  MetricsModel.belongsTo(AgenteModel)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  sequelize.sync()

  const Agent = setupAgent(AgenteModel)
  const Metric = {}
  return {
    Agent, Metric
  }
}
