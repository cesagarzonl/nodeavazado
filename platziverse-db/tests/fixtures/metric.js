'use strict'

const metric = {
  type: 'type',
  value: 'value'
}

const metrics = [
  metric,
  extender(metric, { type: 'type', value: 'yyy-yyy-yyw'}),
  extender(metric, { type: 'type', value: 'yyy-yyy-yyx'}),
  extender(metric, { type: 'type', value: 'yyy-yyy-yyz'})
]

function extender (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}
module.exports = {
  single: metric,
  all: metrics,
  type: metrics.filter(a => a.type),
  value: agents.filter(a => a.value === 'yyy-yyy-yyw')
}