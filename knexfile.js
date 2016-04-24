// Knexfile

module.exports = {
  development: {
    client: 'postgresql',
    connection: {
      host: 'ec2-174-129-37-54.compute-1.amazonaws.com',
      database: 'dc0renfk3bar9b',
      user: 'gikrkpnuifjzsi',
      password: 'hM0GKORQHYdDAg3gobWKdJL61F',
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
