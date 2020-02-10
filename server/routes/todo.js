const router = require('express').Router()
const todoController = require('../controllers/ToDoController')
const oauth = require('../middleware/OAuth')
router.post('/',oauth.authenticate, todoController.create)
router.get('/',oauth.authenticate, todoController.findAll)
router.get('/:id', todoController.findOne)
router.put('/:id',oauth.authenticate, oauth.authorizeToDo, todoController.updateOne)
router.delete('/:id', oauth.authenticate, oauth.authorizeToDo, todoController.deleteOne)
router.delete('/', todoController.deleteAll)

module.exports = router;