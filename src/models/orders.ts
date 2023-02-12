import client from '../pgdb';

// for relationship purposes there is going to be different order types in this file based on the action that we need to make for more orgnization and clean code fomate

// regular order data
export type Order = {
  id?: number;
  user_id: number;
  order_status: boolean;
};

// order details data
export type OrderDetails = {
  id?: number;
  order_id: number;
  product_id: number;
  products_orderd_quantity: number;
};

export class StoreOrders {
  async index(): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const getAllOrders = 'SELECT * FROM Orders';
      const result = await connection.query(getAllOrders);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not retrieve orders from the database, Error:  ${error}`
      );
    }
  }

  async show(userid: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const ShowSpecificOrderquery = `SELECT * FROM Orders WHERE user_id=${userid}`;
      const result = await connection.query(ShowSpecificOrderquery);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not retrieve order for user no. ${userid} from the database, Error:  ${error}`
      );
    }
  }
  async create(o: Order): Promise<Order> {
    try {
      const connection = await client.connect();
      const NewOrderquery =
        'INSERT INTO Orders (user_id, order_status) VALUES ($1, $2) RETURNING *';
      const result = await connection.query(NewOrderquery, [
        o.user_id,
        o.order_status,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create order, Error:  ${error}`);
    }
  }

  async addProducts(o: OrderDetails): Promise<OrderDetails> {
    try {
      const connection = await client.connect();
      const AddProductToOrder =
        'INSERT INTO carts (order_id ,product_id,quantity) VALUES ($1, $2, $3) RETURNING *';
      const result = await connection.query(AddProductToOrder, [
        o.order_id,
        o.product_id,
        o.products_orderd_quantity,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not add product to order, Error:  ${error}`);
    }
  }

  async showCompleted(userid: number): Promise<Order[]> {
    try {
      const connection = await client.connect();
      const ShowCompletedOrders = `SELECT * FROM Orders WHERE user_id=${userid} AND order_status='true'`;
      const result = await connection.query(ShowCompletedOrders);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not retrieve order for user no. ${userid} from the database, Error:  ${error}`
      );
    }
  }
}
