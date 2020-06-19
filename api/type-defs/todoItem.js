const TodoItem = `
  type TodoItem {
    id: ID!
    todo_id: String
    text: String
  }

  input getTodoItems{
    todoId: ID!
  }
  extend type Query {
    todoItem(input: getTodoItems): [TodoItem]
  }

  input AddTodoItemInput{
    text: String!
    todoId: String
  }
  
  input EditTodoItemInput{
    id: ID!
    text: String
  }

  input RemoveTodoItemInput{
    id: ID!
  }

  extend type Mutation {
    addTodoItem(input: AddTodoItemInput): TodoItem
    editTodoItem(input: EditTodoItemInput): TodoItem
    removeTodoItem(input: RemoveTodoItemInput): TodoItem
  }
`
module.exports = TodoItem
