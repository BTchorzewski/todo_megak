const express = require('express');
const Router = express.Router();
const controller = require('../controller/todo');

Router.get('/todos', controller.getTodos);
Router.post('/todo', controller.addTodo);
Router.post('/uncheck', controller.uncheckTodo);
Router.post('/check', controller.checkTodo);

module.exports = Router;