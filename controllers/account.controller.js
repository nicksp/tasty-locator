const mongoose = require('mongoose')

exports.renderSigninForm = (req, res) => {
  res.render('signin', { title: 'Sign In' })
}

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name')
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  })
  req.checkBody('name', 'Please supply a name').notEmpty()
  req.checkBody('email')
    .notEmpty().withMessage('Please supply an email address')
    .isEmail().withMessage('Invalid email address')
  req.checkBody('password', 'Password cannot be blank').notEmpty()
  req.checkBody('password-confirm', 'Confirm password cannot be blank').notEmpty()
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password)

  const errors = req.validationErrors()

  if (errors) {
    req.flash('error', errors.map(err => err.msg))
    res.render('signup', { title: 'Sign Up', body: req.body, flashes: req.flash() })
    return
  }

  next()
}

exports.renderSignupForm = (req, res) => {
  res.render('signup', { title: 'Sign Up' })
}
