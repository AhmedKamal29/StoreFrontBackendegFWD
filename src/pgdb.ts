import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const {
  ENV,
  DATABASE_HOST,
  DATABASE_PORT,
  DATABASE_DEV_DB,
  DATABASE_TEST_DB,
  DATABASE_USER,
  DATABASE_PASSWORD,
} = process.env;

let client = new Pool();

if (ENV === 'dev') {
  client = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_DEV_DB,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT as string, 10),
  });
}

if (ENV === 'test') {
  client = new Pool({
    host: DATABASE_HOST,
    database: DATABASE_TEST_DB,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    port: parseInt(DATABASE_PORT as string, 10),
  });
}

export default client;
