const { editTodoItem } = require('../../../shared/db/todoItem')

export default async (_parent, _args, _context) => {
  const { text, id } = _args.input

  if (!id) return new Error('id 不能為空')
  if (!text) return new Error('不能設內容為空')

  return editTodoItem(_args.input)
}
