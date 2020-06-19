import gql from 'graphql-tag'

export const getTodo = gql`
  query todo($filter: TodoFilter){
    todo(filter: $filter){
      pageInfo{
        hasNextPage
      }
      edges{
        cursor
        node{
          id
          title
          is_complete
        }
      }
    }
  }
`
