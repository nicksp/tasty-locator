const router = require('express').Router()
const storeController = require('../controllers/store.controller')

router.get('/', storeController.homePage)
router.get('/add', storeController.addStore)
router.post('/add', storeController.createStore)

module.exports = router
