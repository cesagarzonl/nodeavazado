'use strict'

module.exports = function setupMEtric (MetricModel, AgenteModel) {
  async function findByAgentUuid (uuid) {
    return MetricModel.findall({
      attributes: ['type'],
      group: ['type'],
      include: [{
        attributes: [],
        model: AgenteModel,
        where: {
          uuid
        }
      }],
      raw: true
    })
  }

  async function findBytypeAgentUuid (type, uuid) {
    return MetricModel.findAll({
      attributes: ['id', 'type', 'value', 'createdAt'],
      where: {
        type
      },
      limit: 20,
      order: [['createdAt', 'DESC']],
      include: [{
        attributes: [],
        model: AgenteModel,
        where: {
          uuid
        }
      }],
      raw: true
    })
  }

  async function create (uuid, metric) {
    const agent = await AgenteModel.findOne({
      where: { uuid }
    })
    if (agent) {
      Object.assign(metric, { agentID: agent.id })
      const result = await MetricModel.create(metric)
      return result.toJSON()
    }
  }
  return {
    create,
    findByAgentUuid,
    findBytypeAgentUuid
  }
}
