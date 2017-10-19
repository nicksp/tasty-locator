const fs = require('fs')
const mongoose = require('mongoose')
require('dotenv').config({ path: __dirname + '/../.env' })

mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
mongoose.connect(process.env.DATABASE_URI, {
  useMongoClient: true,
  promiseLibrary: global.Promise
})

// Import all of our models - they need to be imported only once
const Store = require('../models/Store')
const Review = require('../models/Review')
const User = require('../models/User')

const stores = JSON.parse(fs.readFileSync(__dirname + '/stores.json', 'utf-8'))
const reviews = JSON.parse(fs.readFileSync(__dirname + '/reviews.json', 'utf-8'))
const users = JSON.parse(fs.readFileSync(__dirname + '/users.json', 'utf-8'))

async function loadData() {
  try {
    await Store.insertMany(stores)
    await Review.insertMany(reviews)
    await User.insertMany(users)
    console.info('👍👍👍👍👍👍👍👍 Done!')
    process.exit()
  } catch (e) {
    console.info('\n👎👎👎👎👎👎👎👎 Error! The Error info is below, but if you are importing sample data make sure to drop the existing database first with.\n\n\t yarn blowitallaway\n\n\n')
    console.log(e)
    process.exit()
  }
}

async function deleteData() {
  console.log('😢😢 Goodbye Data...')
  await Store.remove()
  await Review.remove()
  await User.remove()
  console.info('Data Deleted. To load sample data, run\n\n\t yarn sample\n\n')
  process.exit()
}

if (process.argv.includes('--delete')) {
  deleteData()
} else {
  loadData()
}
