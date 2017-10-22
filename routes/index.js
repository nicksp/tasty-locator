const router = require('express').Router()
const storeController = require('../controllers/store.controller')

const { asyncMiddleware } = require('../handlers/errorHandlers')

router.get('/', asyncMiddleware(storeController.getStores))
router.get('/stores', asyncMiddleware(storeController.getStores))
router.get('/add', storeController.addStore)
router.post('/add', asyncMiddleware(storeController.createStore))

module.exports = router
