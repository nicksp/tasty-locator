const router = require('express').Router()

const storeController = require('../../controllers/store.controller')
const accountController = require('../../controllers/account.controller')

const { asyncMiddleware } = require('../../handlers/errorHandlers')

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

// Show the store by slug
router.get('/store/:slug', asyncMiddleware(storeController.getStoreBySlug))

// Show stores by tag
router.get('/tags/:tag?', asyncMiddleware(storeController.getStoresByTag))

// User login
router.route('/signin')
  .get(accountController.renderSigninForm)

// User registration
router.route('/signup')
  .get(accountController.renderSignupForm)
  .post(accountController.validateRegister)

module.exports = router
