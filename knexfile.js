module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.PGSQL_HOST_DEVELOPMENT || 'localhost',
      user: process.env.PGSQL_USER_DEVELOPMENT || undefined,
      password: process.env.PGSQL_PASSWORD_DEVELOPMENT || undefined,
      database: 'todolist'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: process.env.PGSQL_HOST,
      user: process.env.PGSQL_USER,
      password: process.env.PGSQL_PASSWORD,
      database: 'todolist'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
