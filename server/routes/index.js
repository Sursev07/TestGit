const express = require('express')
const todoRoutes = require('./todo')
const userRoutes = require('./user')

const router = express.Router()
router.get('/', function(req,res,next) {
    res.status(200).json({
        message: 'You are connected to click server, refers to API documentation for further information'
    })
})

router.use('/todos', todoRoutes);
router.use('/user', userRoutes);
module.exports = router;