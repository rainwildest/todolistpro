const { db: knex } = require('../knex')
const { v4: uuidv4 } = require('uuid')

const getTodos = async ({ first = 1, after }) => {
  return knex('todo')
    .whereNull('delete_at')
    .andWhere('created_at', '<', new Date(after).toISOString())
    .orderByRaw('coalesce(created_at) desc')
    .limit(first)
}

const addTodo = async (args) => {
  const {
    title
  } = args
  return knex('todo')
    .returning('*')
    .insert({
      id: uuidv4(),
      title,
      is_complete: false,
      created_at: new Date()
    })
    .then((rows) => (rows.length ? rows[0] : null))
}

const removeTodo = async (args) => {
  return knex('todo')
    .returning('*')
    .where({
      id: args.id
    })
    .update({
      delete_at: new Date()
    })
    .then((rows) => (rows.length ? rows[0] : null))
}

const editTodo = async (args) => {
  return knex('todo')
    .returning('*')
    .where({
      id: args.id
    })
    .update({
      title: args.title,
      modified_at: new Date()
    })
    .then((rows) => (rows.length ? rows[0] : null))
}

const todoComplete = (args) => {
  const {
    id,
    isComplete = false
  } = args

  return knex('todo')
    .returning('*')
    .where({
      id
    })
    .update({
      is_complete: isComplete
    })
    .then((rows) => (rows.length ? rows[0] : null))
}
module.exports = {
  editTodo,
  addTodo,
  removeTodo,
  getTodos,
  todoComplete
}
