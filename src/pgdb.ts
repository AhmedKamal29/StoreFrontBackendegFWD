import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  // NODE_ENV,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_DEV_DB,
  // DATABASE_test_DB,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = process.env;

const client = new Pool({
  host: DATABASE_HOST,
  database: DATABASE_DEV_DB,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
  port: parseInt(DATABASE_PORT as string, 10),
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
