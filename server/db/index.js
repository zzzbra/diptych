require('dotenv').config();
const knexConfig = require('./knexfile');
const knex = require('knex');
const db = knex(knexConfig[process.env.NODE_ENV]);

module.exports = db;
