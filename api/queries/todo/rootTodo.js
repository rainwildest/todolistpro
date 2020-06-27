const { getTodos } = require('../../../shared/db/todo')

export default async (_parent, _args, _context) => {
  const { first = 1, after = new Date().toISOString() } = _args.filter

  const dbTodo = await getTodos({
    first,
    after
  })

  return {
    pageInfo: {
      hasNextPage: dbTodo && dbTodo.length >= first // 返回的資料數如果等於 first(要求拿多少個), 代表有下一版
    },
    edges: dbTodo.map((val) => {
      return {
        node: {
          ...val
        },
        cursor: new Date(val.created_at).toISOString()
      }
    })
  }
}
