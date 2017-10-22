const router = require('express').Router()
const storeController = require('../controllers/store.controller')

const { asyncMiddleware } = require('../handlers/errorHandlers')

router.get('/', asyncMiddleware(storeController.getStores))

router.get('/stores', asyncMiddleware(storeController.getStores))
router.get('/stores/:id/edit', asyncMiddleware(storeController.editStore))

router.get('/add', storeController.addStore)
router.post('/add', asyncMiddleware(storeController.createStore))
router.post('/add/:id', asyncMiddleware(storeController.updateStore))

module.exports = router
