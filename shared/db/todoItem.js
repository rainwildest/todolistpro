const { db: knex } = require('../knex')
const { v4: uuidv4 } = require('uuid')

const getTodoItems = async (args) => {
  return knex('todo_item')
    .where({
      todo_id: args
    })
    .whereNull('delete_at')
    .then((rows) => (rows.length ? rows : null))
}

const addTodoItem = async (args) => {
  const {
    text,
    todoId
  } = args
  return knex('todo_item')
    .returning('*')
    .insert({
      id: uuidv4(),
      text,
      todo_id: todoId,
      is_complete: false
    })
    .then((rows) => (rows.length ? rows[0] : null))
}

const editTodoItem = async (args) => {
  return knex('todo_item')
    .returning('*')
    .where({
      id: args.id
    })
    .update({
      text: args.text
    })
    .then((rows) => (rows.length ? rows[0] : null))
}

const removeTodoItem = async (args) => {
  return knex('todo_item')
    .returning('*')
    .where({
      id: args.id
    })
    .update({
      delete_at: new Date()
    })
    .then((rows) => (rows.length ? rows[0] : null))
}

module.exports = {
  editTodoItem,
  addTodoItem,
  removeTodoItem,
  getTodoItems
}
