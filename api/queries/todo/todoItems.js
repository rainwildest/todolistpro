const { getTodoItems } = require('../../../shared/db/todoItem')

export default async (_parent, _args, _context) => {
  return getTodoItems(_parent.id)
}
