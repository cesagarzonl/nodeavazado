'use strict'

const test = require('ava')

let config ={
  logging:function(){}
}

let db = null



test.beforeEach(async()=>{
	const setupDatabase = require('../')
	db = await setupDatabase(config)
})

test('Agent', t => {
	t.truthy(db.agent, 'Agent Exist')
})