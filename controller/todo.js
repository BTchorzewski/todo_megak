// eslint-disable-next-line import/extensions
const Todo = require('../model/todo');

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.getDB();
    res.status(200).json(todos);
  } catch (e) {
    res.status(500).json({ msg: 'error' });
  }
};

exports.addTodo = async (req, res) => {
  const { note } = req.body;
  const todo = new Todo(note);
  try {
    await todo.save();
    res.status(200).json({ msg: 'saved', todo });
  } catch (e) {
    res.status(500).json({ msg: 'error' });
  }
};

exports.uncheckTodo = async (req, res) => {
  const { id } = req.body;
  try {
    const todo = await Todo.uncheckTodo(id);
    res.status(200).json({ msg: 'todo unchecked', todo });
  } catch (e) {
    res.status(500).json({ msg: 'error' });
  }
};

exports.checkTodo = async (req, res) => {
  const { id } = req.body;
  try {
    const todo = await Todo.checkTodo(id);
    res.status(200).json({ msg: 'todo unchecked', todo });
  } catch (e) {
    res.status(500).json({ msg: 'error' });
  }
};
