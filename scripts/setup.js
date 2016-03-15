#!/usr/bin/env node

const $ = require('shelljs')
const hosts = process.env.NODE_ENV === 'development' ? [
  process.env.FRONT_HOST,
  process.env.USER_API_HOST,
  process.env.BASE_DB_HOST,
  process.env.KIBANA_HOST,
  process.env.LOGSTASH_HOST,
  process.env.ELASTIC_HOST
] : []

hosts.forEach(function (host) {
  if (!host) return
  $.exec('sudo hostile set localhost ' + host)
})
