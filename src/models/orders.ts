import client from '../pgdb';

// for relationship purposes there is going to be different order types in this file based on the action that we need to make for more orgnization and clean code fomate

// regular order data
export type Order = {
  id?: number;
  user_id: number;
  order_status: boolean;
};

export type OrderDetails = {
  id?: number;
  order_id: number;
  product_id: number;
  products_orderd_quantity: number;
};

export class StoreOrders {
  async getUserOrders(userid: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const ShowSpecificOrderquery = `SELECT * FROM Orders WHERE user_id=${userid}`;
      const result = await connection.query(ShowSpecificOrderquery);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not retrieve order no. ${userid} from the database, Error:  ${error}`
      );
    }
  }
  // async create(o: Order): Promise<Order> {
  //   try {
  //     const connection = await client.connect();
  //     const NewOrderquery =
  //       'INSERT INTO Orders (user_id,product_id,products_order_quantity) VALUES ($1, $2, $3)';
  //     const result = await connection.query(NewOrderquery, [
  //       o.user_id,
  //       o.prduct_id,
  //       o.products_order_quantity,
  //       o.order_status,
  //     ]);
  //     connection.release();
  //     return result.rows[0];
  //   } catch (error) {
  //     throw new Error(`could not create order, Error:  ${error}`);
  //   }
  // }
}
