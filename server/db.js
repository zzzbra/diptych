const Pool = require('pg').Pool;

const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

const pool = new Pool({
  user,
  password,
  host: 'localhost',
  port: 5432,
  database: 'perntodo',
});

module.exports = pool;
