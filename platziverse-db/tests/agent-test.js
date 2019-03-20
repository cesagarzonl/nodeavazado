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
let uuid = 'yyy-yyy-yyy'
let single = Object.assign({}, agentFixtures.single)
let AgentStub = null
let db = null
let sandbox = null
let uuidArgs= {
	where:{
		uuid
	}
}

test.beforeEach(async () => {
  sandbox = sinon.sandbox.create()

  AgentStub = {
  	hasMany: sandbox.spy()
  }

	// model find One stub
	AgentStub.findOne= sandbox.stub()
    AgentStub.findOne.withArgs(uuidArgs).returns(Promise.resolve(agentFixtures.byUuid(uuid)))
  //model findby id stub
  AgentStub.findById = sandbox.stub()
  AgentStub.findById.withArgs(id).returns(Promise.resolve(agentFixtures.byId(id)))
// model update stub
	AgentStub.update = sandbox.stub()
	AgentStub.update.withArgs(single, uuidArgs).returns(Promise.resolve(single))


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

test.serial('Agent#createORUpdate - existe',async t=>{
	let agent= await db.Agent.createOrUpdate(single)
	t.true(AgentStub.findOne.called, 'find one should be callled on model')
	t.true(AgentStub.findOne.calledTwice,'finOne shoud be called twice')
	t.true(AgentStub.update.calledOnce,'finOne shoud be called twice')
	t.deepEqual(agent, single, 'agent should be the same')
})