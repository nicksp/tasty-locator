const mongoose = require('mognoose')
const md5 = require('md5')
const validator = require('validator')
const mongodbErrorHandler = require('mongoose-mongodb-errors')
const passportLocalMongoose = require('passport-local-mongoose')

mongoose.Promise = global.Promise

const accountSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: 'Please supply an email address',
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  }
})

accountSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
accountSchema.plugin(mongodbErrorHandler)

module.exports = mongoose.model('Account', accountSchema)
