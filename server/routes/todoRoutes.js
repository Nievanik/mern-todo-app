const express = require('express');
const router = express.Router();
const controller = require("../controllers/todo.js");

router.get('/:id', controller.getTodo);
router.get('/', controller.getAllTodos);
router.post('/', controller.newTodo);
router.put('/:id', controller.updateTodo);
router.delete('/:id', controller.deleteTodo);


module.exports = router;