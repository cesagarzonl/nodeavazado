'use strict'

const agent = {
  id: 1,
  uuid: 'yyy-yyy-yyy',
  name: 'fixture',
  username: 'plarzi',
  hostname: 'test-host',
  pid: 0,
  connected: true,
  createdAd: new Date(),
  updatedAd: new Date()
}

const agents = [
  agent,
  extender(agent, { id: 2, uuid: 'yyy-yyy-yyw', connected: false, username: 'platzy2' }),
  extender(agent, { id: 3, uuid: 'yyy-yyy-yyx' }),
  extender(agent, { id: 4, uuid: 'yyy-yyy-yyz', username: 'platzy2' })
]

function extender (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}
module.exports = {
  single: agent,
  all: agents,
  connected: agents.filter(a => a.connected),
  plartzi: agents.filter(a => a.username === 'plarzi'),
  byUuid: id => agents.filter(a => a.uuid === id).shift(),
  byId: id => agents.filter(a => a.id === id).shift()
}
