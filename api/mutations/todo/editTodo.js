const { editTodo } = require('../../../shared/db/todo')

export default async (_parent, _args, _context) => {
  const { id, title } = _args.input

  if (!id) return new Error('todo Id 不能為空')
  if (!title) return new Error('不能設內容為空')

  return editTodo(_args.input)
}
