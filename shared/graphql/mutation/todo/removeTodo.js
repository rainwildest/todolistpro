import gql from 'graphql-tag'
export const DeleteTodoMutation = gql`
  mutation removeTodo($input:RemoveTodoInput) {
    removeTodo(input: $input) {
      id
      title
    }
  }
`
