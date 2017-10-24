const mongoose = require('mongoose')
const Store = mongoose.model('Store')

exports.renderAddStore = (req, res) => {
  res.render('editStore', { title: 'Add Store' })
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
  res.redirect(`/stores/${store._id}/edit`)
}
