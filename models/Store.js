const mongoose = require('mongoose')
const slug = require('slugs')

mongoose.Promise = global.Promise

const storeSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please provide a store name.'
  },
  slug: String,
  description: {
    type: String,
    trim: true
  },
  tags: [String],
  created: {
    type: Date,
    default: Date.now()
  },
  location: {
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: [{
      type: Number,
      required: 'You must supply coordinates.'
    }],
    address: {
      type: String,
      required: 'You must supply an address.'
    }
  },
  photo: String
})

storeSchema.pre('save', async function (next) {
  if (!this.isModified('name')) {
    return next()
  }
  this.slug = slug(this.name)
  const slugRegex = new RegExp(`^${this.slug}((-[0-9]*$)?)$`, 'i')
  const storesWithSlug = await this.constructor.find({ slug: slugRegex })
  const storesWithSlugNumber = storesWithSlug.length
  if (storesWithSlugNumber) {
    this.slug = `${this.slug}-${storesWithSlugNumber}`
  }
  next()
})

storeSchema.statics.getTagsList = function () {
  return this.aggregate([
    { $unwind: '$tags' },
    {
      $group: {
        _id: '$tags',
        count: { $sum: 1 }
      }
    },
    {
      $sort: {
        count: -1
      }
    }
  ])
}

module.exports = mongoose.model('Store', storeSchema)
