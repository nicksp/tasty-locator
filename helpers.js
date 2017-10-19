const fs = require('fs')

// A handy library for manipulating dates
exports.dateFns = require('date-fns')

// Dump is a handy debugging function we can use to sort of "console.log" our data
exports.dump = obj => JSON.stringify(obj, null, 2)

// Making a static Google map
exports.staticMap = ([lng, lat]) => `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=800x150&key=${process.env.MAP_KEY}&markers=${lat},${lng}&scale=2`

// Inserting an SVG by name
exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.svg`)

// Some details about the site
exports.siteName = 'A Simple Store Locator'

exports.menu = [
  { slug: '/stores', title: 'Stores', icon: 'store' },
  { slug: '/tags', title: 'Tags', icon: 'tag' },
  { slug: '/top', title: 'Top', icon: 'top' },
  { slug: '/add', title: 'Add', icon: 'add' },
  { slug: '/map', title: 'Map', icon: 'map' }
]
