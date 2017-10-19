const express = require('express')
const session = require('express-session')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require('passport')
const promisify = require('es6-promisify')
const flash = require('connect-flash')
const expressValidator = require('express-validator')

const routes = require('./routes')
const helpers = require('./helpers')
const errorHandlers = require('./handlers/errorHandlers')

// Create Express app
const app = express()

// View engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Serve up static files from the public folder
app.use(express.static(path.join(__dirname, 'public')))

// Turn the raw requests into usable properties on `req.body`
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Expose a bunch of methods for validating data
app.use(expressValidator())

// Populates `req.cookies` with any cookies that came along with the request
app.use(cookieParser())

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

// Auth stuff
app.use(passport.initialize())
app.use(passport.session())

// The flash middleware lets us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash())

// Pass variables to the templates + all requests
app.use((req, res, next) => {
  res.locals.h = helpers
  res.locals.flashes = req.flash()
  res.locals.user = req.user || null
  res.locals.currentPath = req.path
  next()
})

// Promisify some callback based APIs
app.use((req, res, next) => {
  req.login = promisify(req.login, req)
  next()
})

// Handle our routes
app.use('/', routes)

// In case above routes didn't work, we 404 them and forward to error handler
app.use(errorHandlers.notFound)

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors)

// Otherwise this was a really bad error we didn't expect!
if (app.get('env') === 'development') {
  // Development Error Handler - prints stack trace
  app.use(errorHandlers.developmentErrors)
}

// Production error handler
app.use(errorHandlers.productionErrors)

// Done, export it
module.exports = app
