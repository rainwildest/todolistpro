import addTodo from './addTodo'
import editTodo from './editTodo'
import removeTodo from './removeTodo'
import todoComplete from './todoComplete'

module.exports = {
  Mutation: {
    addTodo,
    editTodo,
    removeTodo,
    todoComplete
  }
}
