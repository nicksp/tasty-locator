const router = require('express').Router()
const storeController = require('../controllers/store.controller')

const { asyncMiddleware } = require('../handlers/errorHandlers')

router.get('/', asyncMiddleware(storeController.renderStores))

router.get('/stores', asyncMiddleware(storeController.renderStores))
router.get('/stores/:id/edit', asyncMiddleware(storeController.renderEditStores))

router.route('/add')
  .get(storeController.renderAddStore)
  .post(
    storeController.upload,
    asyncMiddleware(storeController.resize),
    asyncMiddleware(storeController.createStore)
  )

router.post('/add/:id',
  storeController.upload,
  asyncMiddleware(storeController.resize),
  asyncMiddleware(storeController.updateStore)
)

module.exports = router
