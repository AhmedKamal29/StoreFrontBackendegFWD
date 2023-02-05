import client from '../pgdb';

export type Product = {
  id: number;
  product_name: string;
  product_price: number;
  Product_category: string;
};

export class storeProducts {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM books';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not retrieve data from the database, Error:  ${error}`
      );
    }
  }

  async show(id: string): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql: string = `SELECT * FROM Products WWHERE id=${id}`;
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not retrieve data from the database, Error:  ${error}`
      );
    }
  }
}
