const { addTodo } = require('../../../shared/db/todo')

export default async (_parent, _args, _context) => {
  const { title } = _args.input
  if (!title) return new Error('不能設內容為空')

  return addTodo(_args.input)
}
