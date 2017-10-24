const mongoose = require('mongoose')
const multer = require('multer')
const jimp = require('jimp')
const uuid = require('uuid')
const Store = mongoose.model('Store')

const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/')
    if (isPhoto) {
      next(null, true)
    } else {
      next({ message: 'That filetype isn\'t allowed' }, false)
    }
  }
}

exports.renderAddStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' })
}

exports.upload = multer(multerOptions).single('photo')

exports.resize = async (req, res, next) => {
  // Check if there is a file to resize
  if (!req.file) {
    return next()
  }

  const extension = req.file.mimetype.split('/')[1]
  req.body.photo = `${uuid.v4()}.${extension}`

  // Resize the photo
  const photo = await jimp.read(req.file.buffer)
  await photo.resize(650, jimp.AUTO)
  await photo.write(`./public/uploads/${req.body.photo}`)

  next()
}

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save()
  req.flash('success', `Successfully created <b>${store.name}</b>. Care to leave a review?`)
  res.redirect(`/store/${store.slug}`)
}

exports.renderStores = async (req, res) => {
  const stores = await Store.find()
  res.render('stores', { title: 'Stores', stores })
}

exports.renderEditStores = async (req, res) => {
  const storeId = req.params.id
  const store = await Store.findOne({ _id: storeId })
  res.render('editStore', { title: `Edit ${store.name}`, store })
}

exports.updateStore = async (req, res) => {
  const storeId = req.params.id
  req.body.location.type = 'Point'
  const store = await Store.findOneAndUpdate({ _id: storeId }, req.body, {
    new: true,
    runValidators: true
  }).exec()
  req.flash('success', `Successfully updated <b>${store.name}</b>. <a href="/store/${store.slug}">View Store →</a>`)
  res.redirect(`/stores/${store._id}`)
}
