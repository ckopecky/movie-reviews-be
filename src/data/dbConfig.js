require('dotenv').config()
const env = process.env.NODE_ENV || 'development';
const knex = require('knex');
const knexfile = require('../../knexfile')[env];
const myknex = knex(knexfile);




module.exports = myknex;