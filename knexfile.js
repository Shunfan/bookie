// Knexfile

module.exports = {
  development: {
    client: '',
    connection: {
      host: '',
      database: '',
      user: '',
      password: '',
      charset: 'utf8',
      ssl :true
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
};
