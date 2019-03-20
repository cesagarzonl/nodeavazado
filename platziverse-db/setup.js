'use strict'
const inquirer = require('inquirer')
const chalk = require('chalk')
const debug = require('debug')('platziverse:db:setup')
const db = require('./')

  const prompt = inquirer.createPromptModule()

async function setup () {
  const answer = await prompt([{
    type:'confirm',
    name:'setup',
    message:'this will destroy you database, are you sure? '
  }])

  if (!answer.setup) {
    return console.log('nothnig happend!')
  }

  const config = {
    database: process.env.DB_NAME || 'platziverse',
    username: process.env.DB_USER || 'platzi',
    password: process.env.DB_PASS || 'platzi',
    host: process.env.DB_HOST || 'LOCALHOST',
    dialect: 'postgres',
    logging: s => debug(s),
    setup: true
  }
  await db(config).catch(handledFatalError)

  console.log('Succes')
  process.exit(0)

  function handledFatalError (err) {
    console.error(`${chalk.red('fatal erorr')}${err.message}`)
    console.error(err.stack)
    process.exit(1)
  }
}

setup()
