const Router = require('express')
const router = new Router()
const deviceInfoController = require('../controllers/deviceInfoController')

router.get('/', deviceInfoController.getInfo)

module.exports = router