require('dotenv').config();
const knexConfig = require('./knexfile');
const knex = require('knex');
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
console.log('knexConfig: ', knexConfig);
const db = knex(knexConfig[process.env.NODE_ENV]);

module.exports = db;
