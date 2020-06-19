import React from 'react'
import Head from 'next/head'
import { Formik, Form, Field } from 'formik'
import {
  Box,
  Checkbox,
  Heading,
  Input,
  Button,
  FormErrorMessage,
  FormControl,
  Spinner
} from '@chakra-ui/core'
import { withApollo } from '../api/client'
import { useQuery, useMutation } from '@apollo/react-hooks'

import { getTodo } from '../shared/graphql/queries/todo/getTodo'
import { AddTodoMutation } from '../shared/graphql/mutation/todo/addTodo'
import { TodoCompleteMutation } from '../shared/graphql/mutation/todo/editTodoComplete'

// import TodoItems from './todoItems'
import EditTodoItemModel from './editTodoItemModel'
import RemoveTodoAlterDialog from './removeTodoAlterDialog'
import InfiniteScroll from 'react-infinite-scroller'

const Home = () => {
  const [addTodo] = useMutation(AddTodoMutation)
  const [todoComplete] = useMutation(TodoCompleteMutation)

  const {
    loading: todoLoading,
    error: todoError,
    data: todoData,
    refetch: todoRefetch,
    // networkStatus,
    fetchMore
  } = useQuery(getTodo,
    {
      // fetchPolicy: 'cache-and-network'
      variables: { filter: { first: 10 } },
      fetchPolicy: 'network-only'
    }
  )

  // console.log('loading:', todoLoading)
  // console.log('network:', networkStatus)

  if (todoLoading) return <Box>loading...</Box>
  if (todoError) return <Box>Error...</Box>
  if (!todoData || !todoData.todo) return null

  const validateName = (value) => {
    return (!value) ? '該選項不可為空！' : ''
  }

  const editTodoComplete = (e, id) => {
    todoComplete({
      variables: {
        input: {
          id,
          isComplete: e.target.checked
        }
      }
    })
  }

  const {
    todo: {
      edges,
      pageInfo
    }
  } = todoData

  const posts = edges.map(edge => edge.node)

  const onFetchMore = () => {
    fetchMore({
      query: getTodo,
      variables: {
        filter: {
          first: 2,
          after: edges ? edges[edges.length - 1].cursor : null
        }
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        console.log(
          {
            ...prev,
            todo: {
              pageInfo: {
                ...prev.todo.pageInfo,
                ...fetchMoreResult.todo.pageInfo
              },
              edges: [
                ...prev.todo.edges,
                ...fetchMoreResult.todo.edges
              ]
            }
          }
        )
        return null
      }
    })
  }

  return (
    <Box>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box as='div' mx='auto' w='50%' border='1px red solid'>
        <Heading textAlign='center'>Todo list</Heading>
        <Formik
          initialValues={{
            title: ''
          }}
          onSubmit={(values, { setSubmitting }) => {
            const input = { title: values.title }
            addTodo({
              variables: { input }
            }).then(() => {
              setSubmitting(false)
              values.title = ''
              // todoRefetch({ variables: { input } })
            })
          }}
        >
          {({ isSubmitting, values, setFieldValue }) => (
            <Form>
              <Field name='title' validate={validateName}>
                {({ field, form: { touched, errors } }) => (
                  <FormControl d='flex' isInvalid={errors.title && touched.title}>
                    <Input {...field} />
                    <FormErrorMessage>{errors.title}</FormErrorMessage>
                    <Button variantColor='blue' mx={3} type='submit' isLoading={isSubmitting}>
                      送出
                    </Button>
                  </FormControl>
                )}
              </Field>
            </Form>
          )}
        </Formik>

        <Box maxH='150px' overflow='auto'>
          <InfiniteScroll
            pageStart={0}
            loadMore={onFetchMore}
            hasMore={!!pageInfo.hasNextPage}
            initialLoad
            loader={
              <Box key={0} d='flex' m={3} justifyContent='center'>
                <Spinner />
              </Box>
            }
          >
            {edges.map((todo, i) =>
              <Box key={i}>
                <Checkbox
                  defaultIsChecked={todo.node.is_complete}
                  defaultValue
                  onChange={e => {
                    editTodoComplete(e, todo.node.id)
                  }}
                  children={todo.node.title}
                />
                {/* <EditTodoItemModel todoId={todo.id} title={todo.title} todoRefetch={todoRefetch} />
                <RemoveTodoAlterDialog todoId={todo.id} todoRefetch={todoRefetch} /> */}
              </Box>
            )}
          </InfiniteScroll>
        </Box>
      </Box>
    </Box>
  )
}

export default withApollo(Home)
