import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  DATABASE_HOST,
  DATABASE_USER,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  // DATABASE_TEST_DB,
  // MODE,
} = process.env;

const client = new Pool({
  host: DATABASE_HOST,
  database: DATABASE_NAME,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
});

// if (MODE === 'dev') {
//   client = new Pool({
//     host: DATABASE_HOST,
//     database: DATABASE_NAME,
//     user: DATABASE_USER,
//     password: DATABASE_PASSWORD,
//   });
// }

// if (MODE === 'test') {
//   client = new Pool({
//     host: DATABASE_HOST,
//     database: DATABASE_TEST_DB,
//     user: DATABASE_USER,
//     password: DATABASE_PASSWORD,
//   });
// }

export default client;
