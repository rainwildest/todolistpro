import gql from 'graphql-tag'
export const AddTodoMutation = gql`
  mutation addTodo($input:AddTodoInput) {
    addTodo(input: $input) {
      id
      title
    }
  }
`
