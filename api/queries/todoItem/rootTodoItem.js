const { getTodoItems } = require('../../../shared/db/todoItem')

export default async (_parent, _args, _context) => {
  const {
    todoId
  } = _args.input
  if (!todoId) return new Error('todoId 不能為空')
  return getTodoItems(todoId)
}
