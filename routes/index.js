const router = require('express').Router()
const storeController = require('../controllers/store.controller')

const { asyncMiddleware } = require('../handlers/errorHandlers')

router.get('/', asyncMiddleware(storeController.renderStores))

router.get('/stores', asyncMiddleware(storeController.renderStores))
router.get('/stores/:id/edit', asyncMiddleware(storeController.renderEditStores))

router.route('/add')
  .get(storeController.renderAddStore)
  .post(asyncMiddleware(storeController.createStore))

router.post('/add/:id', asyncMiddleware(storeController.updateStore))

module.exports = router
