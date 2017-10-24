const router = require('express').Router()
const storeController = require('../controllers/store.controller')

const { asyncMiddleware } = require('../handlers/errorHandlers')

// Render existing stores
router.get('/', asyncMiddleware(storeController.renderStores))
router.get('/stores', asyncMiddleware(storeController.renderStores))

// Add new store
router.route('/add')
.get(storeController.renderAddStore)
.post(
  storeController.upload,
  asyncMiddleware(storeController.resize),
  asyncMiddleware(storeController.createStore)
)

// Edit a single store
router.route('/stores/:id')
  .get(asyncMiddleware(storeController.renderEditStores))
  .post(
    storeController.upload,
    asyncMiddleware(storeController.resize),
    asyncMiddleware(storeController.updateStore)
  )


module.exports = router
