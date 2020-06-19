import gql from 'graphql-tag'
export const EditTodoMutation = gql`
  mutation editTodo($input:EditTodoInput) {
    editTodo(input: $input) {
      id
      title
    }
  }
`
