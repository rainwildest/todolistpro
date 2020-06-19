import React from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Icon,
  Box
} from '@chakra-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { DeleteTodoMutation } from '../shared/graphql/mutation/todo/removeTodo'

const RemoveTodoAlertDialog = (props) => {
  const [isOpen, setIsOpen] = React.useState()
  const onClose = () => setIsOpen(false)
  const cancelRef = React.useRef()

  const [removeTodo] = useMutation(DeleteTodoMutation)

  const deletedTodo = () => {
    console.log(props.todoId)
    const input = { id: props.todoId }
    removeTodo({
      variables: { input }
    }).then(() => {
      onClose()
      props.todoRefetch({ variables: { input } })
    })
  }
  return (
    <>
      <Icon name='small-close' cursor='pointer' size={5} mt='-3px' ml={1} onClick={() => setIsOpen(true)} />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete
          </AlertDialogHeader>

          <AlertDialogBody>
            確定刪除
            <Box
              as='div'
              display='flex'
              justifyContent='flex-end'
              alignItems='center'
              mt={3}
              px={3}
              pb={3}
            >
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button variantColor='red' onClick={() => deletedTodo()} ml={3}>
                Delete
              </Button>
            </Box>

          </AlertDialogBody>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
export default RemoveTodoAlertDialog
