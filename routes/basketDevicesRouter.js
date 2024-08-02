const Router = require('express')
const router = new Router()
const basketDeviceController = require('../controllers/basketDeviceController')

router.post('/',basketDeviceController.create)
router.get('/',basketDeviceController.getAll)
router.delete('/:id',basketDeviceController.delete)
router.put('/',basketDeviceController.update)

module.exports = router 