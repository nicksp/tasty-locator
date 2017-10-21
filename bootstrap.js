const mongoose = require('mongoose')

// Make sure we are running node 7.6+
const [major, minor] = process.versions.node.split('.').map(parseFloat)
if (major < 7 || (major === 7 && minor <= 5)) {
  console.log('🛑 🌮 🐶 💪 💩\nHey You! \n\t ya you! \n\t\tBuster! \n\tYou\'re on an older version of node that doesn\'t support reired functionality! Please go to nodejs.org and download version 7.6 or higher. 👌\n ')
  process.exit()
}

// Import environmental variables from our .env file
require('dotenv').config({ path: '.env' })

// Connect to our DB and handle any bad connections
mongoose.Promise = global.Promise // Tell Mongoose to use ES6 promises
mongoose.connect(process.env.DATABASE_URI, {
  useMongoClient: true,
  promiseLibrary: global.Promise
})
mongoose.connection.on('error', err => console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫  → ${err.name}: ${err.message}`))

// Import models
require('./models/Store')

// Start our app
const app = require('./app')
const port = process.env.PORT || 2017
const server = app.listen(port, () => console.log(`Server running on port ${server.address().port}`))
