const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()
const todoController = require('../controllers/todo')

router.get('/', todoController.getTodos)
router.post('/', todoController.createTodo)

module.exports = router