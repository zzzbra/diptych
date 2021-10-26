// const { Pool } = require('pg');
const Pool = require('pg').Pool;

const database = process.env.DB;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;

console.log(database, port, host);

const pool = new Pool({
  database,
  user,
  password,
  host,
  port,
});

module.exports = pool;
