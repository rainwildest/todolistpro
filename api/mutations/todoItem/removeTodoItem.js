const { removeTodoItem } = require('../../../shared/db/todoItem')

export default async (_parent, _args, _context) => {
  const { id } = _args.input

  if (!id) return new Error('id 不能為空')

  return removeTodoItem(_args.input)
}
