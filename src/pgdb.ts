import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const client = new Pool({});
