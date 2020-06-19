import gql from 'graphql-tag'
export const TodoCompleteMutation = gql`
  mutation todoComplete($input:TodoCompleteInpt) {
    todoComplete(input: $input) {
      id,
      is_complete,
    }
  }
`
