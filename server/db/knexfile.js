// const path = require("path");
// require('dotenv').config({ path: path.join(__dirname, ) });
require('dotenv').config();

// console.log('process.env', process.env);
// console.log('PGDATABASE', process.env.PGDATABASE);

module.exports = {
  development: {
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
  },
};
