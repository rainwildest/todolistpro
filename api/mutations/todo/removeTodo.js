const { removeTodo } = require('../../../shared/db/todo')

export default async (_parent, _args, _context) => {
  const { id } = _args.input

  if (!id) return new Error('todo Id 不能為空')

  return removeTodo(_args.input)
}
