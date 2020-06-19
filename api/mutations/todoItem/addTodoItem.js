const { addTodoItem } = require('../../../shared/db/todoItem')

export default async (_parent, _args, _context) => {
  const { text, todoId } = _args.input
  if (!todoId) return new Error('todoId 不能為空')
  if (!text) return new Error('不能設內容為空')

  return addTodoItem(_args.input)
}
