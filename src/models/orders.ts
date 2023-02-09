import client from '../pgdb';

export type Order = {
  id?: number;
  user_id: number;
  prduct_id: number;
  products_order_quantity: number;
  order_status: string;
};

export class Oders {
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM Orders';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not retrieve orders from the database, Error:  ${error}`
      );
    }
  }
}
