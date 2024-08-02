const Router = require('express')
const router = new Router()
const basketSeenDevicesController = require('../controllers/basketSeenDevicesController')

router.get('/:id',basketSeenDevicesController.get)
router.put('/',basketSeenDevicesController.update)

module.exports = router