'use strict'

const setupDatabase = require('./lib/db')
const setupAgenteModel = require('./models/agente')
const setupModelsModel = require('./models/metric')

module.exports = async function (config) {
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

  const Agent = {}
  const Metric = {}
  return {
    Agent, Metric
  }
}
