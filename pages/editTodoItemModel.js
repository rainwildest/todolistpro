import { Formik, Form, Field } from 'formik'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  Box,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Icon,
  FormControl,
  Input,
  FormErrorMessage
} from '@chakra-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { EditTodoMutation } from '../shared/graphql/mutation/todo/editTodo'

const AddTodoItemModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editTodo] = useMutation(EditTodoMutation)
  const validateName = (value) => {
    return (!value) ? '該選項不可為空！' : ''
  }

  return (
    <>
      <Icon name='edit' cursor='pointer' size={5} mt='-3px' ml={1} onClick={onOpen} />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>edit todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={{
                title: props.title
              }}
              onSubmit={(values, { setSubmitting }) => {
                const input = {
                  id: props.todoId,
                  title: values.title
                }
                editTodo({
                  variables: { input }
                }).then(() => {
                  onClose()
                  // props.todoRefetch({ variables: { input } })
                })
              }}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form>
                  <Field name='title' validate={validateName}>
                    {({ field, form: { touched, errors } }) => (
                      <FormControl isInvalid={errors.text && touched.text}>
                        <Input {...field} />
                        <FormErrorMessage>{errors.text}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box
                    as='div'
                    display='flex'
                    justifyContent='flex-end'
                    alignItems='center'
                    mt={3}
                    px={3}
                    pb={3}
                  >
                    <Button variant='ghost' mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button variantColor='blue' type='submit' isLoading={isSubmitting}>save</Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AddTodoItemModal
