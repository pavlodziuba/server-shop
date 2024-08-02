const Router = require('express')
const router = new Router()
const compareController = require('../controllers/compareController')
router.post('/', compareController.create)
router.get('/', compareController.getAll)
router.delete('/:id',compareController.delete)

module.exports = router