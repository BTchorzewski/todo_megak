const { writeFile, readFile } = require('fs').promises;

const { nanoid } = require('nanoid');

class Todo {
  constructor(note) {
    this.isChecked = false;
    this.id = nanoid(5);
    this.note = note;
  }

  getId() {
    return this.id;
  }

  get() {
    return this;
  }

  check() {
    this.isChecked = true;
  }

  uncheck() {
    this.isChecked = false;
  }

  async save() {
    const db = await Todo.getDB();
    db.todos.push(this);
    await Todo.saveDB(db);
    return this;
  }

  static async checkTodo(id) {
    const db = await Todo.getDB();
    const index = db.todos.findIndex((todo) => todo.id === id);
    const todo = db.todos[index];
    todo.isChecked = true;
    db.todos.splice(index, 1, todo);
    await Todo.saveDB(db);
    return todo;
  }

  static async uncheckTodo(id) {
    const db = await Todo.getDB();
    const index = db.todos.findIndex((todo) => todo.id === id);
    const todo = db.todos[index];
    todo.isChecked = false;
    db.todos.splice(index, 1, todo);
    await Todo.saveDB(db);
    return todo;
  }

  static async getTodo(id) {
    const db = await Todo.getDB();
    const index = db.todos.findIndex((todo) => todo.id === id);
    const todo = db.todos[index];
    return todo;
  }

  static async getDB() {
    const db = JSON.parse(await readFile('db/db.json', 'utf8'));
    return db;
  }

  static async saveDB(data) {
    await writeFile('db/db.json', JSON.stringify(data), 'utf8');
  }
}

module.exports = Todo;
