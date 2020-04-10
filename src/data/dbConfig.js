import 'dotenv/config';
const env = process.env.NODE_ENV || 'development';

import { environment } from '../knexfile.js';

import knex from 'knex';

knex(environment[env]);

export default knex;