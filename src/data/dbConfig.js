import 'dotenv/config';
const env = process.env.NODE_ENV || 'development';
import knex from 'knex';
import knexfile from 'knexfile';

const myknex = knex(knexfile[env]);

export default myknex;