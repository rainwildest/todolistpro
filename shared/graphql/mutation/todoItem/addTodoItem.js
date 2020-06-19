import gql from 'graphql-tag'
export const AddTodoItemMutation = gql`
  mutation editTodo($input:EditTodoInput) {
    editTodo(input: $input) {
      id
      text
    }
  }
`
