'use strict'

const setupDatabase = require('./lib/db')
const setupAgenteModel = require('./model/agente')
const setupModelsModel = require('./model/metric')

module.exports = async function (configuracion) {
  const sequelize = setupDatabase(configuracion)
  const AgenteModel = setupAgenteModel(configuracion)
  const MetricsModel = setupModelsModel(configuracion)

  AgenteModel.hasMany(MetricsModel)
  MetricsModel.belongsTo(AgenteModel)

  await sequelize.authentiaate()

  sequelize.sync()

  const Agent = {}
  const Metric = {}
  return {
    Agent, Metric
  }
}
