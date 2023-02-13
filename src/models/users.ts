import client from '../pgdb';
import bcrypt from 'bcrypt';

export type User = {
  id?: number;
  FName: string;
  LName: string;
  PasswordDigest: string;
};

export class StoreUsers {
  async index(): Promise<User[]> {
    try {
      const connection = await client.connect();
      const GetAllUsers = 'SELECT * FROM users';
      const result = await connection.query(GetAllUsers);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `Couldn't retreive all the users due to this ... Error: ${error}`
      );
    }
  }

  async show(userId: number): Promise<User | null> {
    try {
      const connection = await client.connect();
      const GetSpacificUser = 'SELECT * FROM users WHERE id = $1';
      const result = await connection.query(GetSpacificUser, [userId]);
      connection.release();
      if (result.rows.length === 0) {
        return null;
      }
      const user = result.rows[0];
      return user;
    } catch (error) {
      throw new Error(
        `Couldn't retrieve the data of the spacified user due to this ... Error: ${error}`
      );
    }
  }

  async create(u: User): Promise<User> {
    try {
      const NewUser =
        'INSERT INTO Users (fname,lname,password_digest) VALUES ($1, $2, $3) RETURNING *';
      const connection = await client.connect();
      const hash = bcrypt.hashSync(
        u.PasswordDigest + process.env.BCRYPT_PASSWORD,
        parseInt(process.env.SALT_ROUNDS as string)
      );
      const result = await connection.query(NewUser, [u.FName, u.LName, hash]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't create a new user, sorry ... Error: ${error}`);
    }
  }

  async authenticate(u: User): Promise<User | null> {
    try {
      const connection = await client.connect();
      const authentication = 'SELECT * FROM users WHERE fname = $1 ';
      const result = await connection.query(authentication, [u.FName]);
      connection.release();
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
      const authenticate = bcrypt.compareSync(
        u.PasswordDigest + process.env.BCRYPT_PASSWORD,
        result.rows[0].password_digest
      );
      if (!authenticate) {
        return null;
      }
      return result.rows[0];
    } catch (error) {
      throw new Error(`Couldn't authenticate user ${error}`);
    }
  }
}
