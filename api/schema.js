import { makeExecutableSchema } from 'graphql-tools'
// import { typeDefs } from './type-defs'
// import { resolvers } from './resolvers'

const { merge } = require('lodash')

const todoQuery = require('./queries/todo')
const todoItemQuery = require('./queries/todoItem')

const todoMutation = require('./mutations/todo')
const todoItemMutation = require('./mutations/todoItem')

const todoType = require('./type-defs/todo')
const todoItemType = require('./type-defs/todoItem')

const resolvers = merge(
  todoQuery,
  todoItemQuery,

  todoMutation,
  todoItemMutation
)

const Root = /* GraphQL */ `
  # The dummy queries and mutations are necessary because
  # graphql-js cannot have empty root types and we only extend
  # these types later on
  # Ref: apollographql/graphql-tools#293
  type Query {
    dummy: String
  }
  type Mutation {
    dummy: String
  }
  type Subscription {
    dummy: String
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`

export const schema = makeExecutableSchema({
  typeDefs: [
    Root,
    todoType,
    todoItemType
  ],
  resolvers
})
