const router = require('express').Router()
const userController = require('../controllers/UserController')

router.post('/register', userController.register)
router.post('/login', userController.signin)
router.get('/', userController.findAll)
module.exports = router

