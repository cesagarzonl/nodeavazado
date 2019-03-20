'use strict'

const test = require('ava')
const proxyquire = require('proxyquire')
const sinon = require('sinon')
const agentFixtures = require('./fixtures/agent')
let config = {
  logging: function () {}
}

let MetricStub = {
  belongsTo: sinon.spy()
}
let id = 1
let single = Object.assign({}, agentFixtures.single)
let AgentStub = null
let db = null
let sandbox = null

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  AgentStub = {
  	hasMany: sandbox.spy()
  }

  //model findby id stub
  AgentStub.findById = sandbox.stub()
  AgentStub.findById.withArgs(id).returns(Promise.resolve(agentFixtures.byId(id)))



  const setupDatabase = proxyquire('../', {
  	'./models/agente': () => AgentStub,
  	'./models/metric': () => MetricStub
  })
  db = await setupDatabase(config)
})

test.afterEach(() => {
  sandbox && sinon.sandbox.restore()
})
test('Agent', t => {
  t.truthy(db.Agent, 'Agent Exist')
})
test.serial('Setup', t => {
  t.true(AgentStub.hasMany.called, 'AgenntModel.hasMany was execute')
  t.true(AgentStub.hasMany.calledWith(MetricStub), 'Agument needs to be the model')
  t.true(MetricStub.belongsTo.calledWith(AgentStub), 'Agument needs to be the model')
  t.true(MetricStub.belongsTo.called, 'MetricModel.hasMany was execute')
})
test.serial('Agent#findByID', async t => {
  let agent = await db.Agent.findById(id)

  t.deepEqual(agent, agentFixtures.byId(id), 'should be the same')
})
