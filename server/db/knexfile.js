require('dotenv').config();

console.log('NODE_ENV', process.env.NODE_ENV);

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
