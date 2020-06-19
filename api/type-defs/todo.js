const Todo = `
  type Todo {
    id: ID!
    title: String
    todoItems: [TodoItem]
    is_complete: Boolean
  }

  input TodoFilter{
    first: Int,
    after: String
  }

  type PageInfo {
    hasNextPage: Boolean
    hasPreviousPage: Boolean
  }

  type SchooluserPostsConnection {
    pageInfo: PageInfo!
    edges: [SchooluserPostEdge!]
  }

  type SchooluserPostEdge {
    cursor: String!
    node: Todo
  }

  extend type Query {
    todo(filter:TodoFilter): SchooluserPostsConnection
  }

  input AddTodoInput{
    title: String!
  }

  input EditTodoInput{
    title: String
    id: ID!
  }

  input RemoveTodoInput{
    id: ID!
  }
  input TodoCompleteInpt{
    id: ID!
    isComplete: Boolean
  }
  extend type Mutation {
    addTodo(input:AddTodoInput): Todo
    editTodo(input: EditTodoInput): Todo
    removeTodo(input: RemoveTodoInput): Todo
    todoComplete(input:TodoCompleteInpt): Todo
  }
`
module.exports = Todo
