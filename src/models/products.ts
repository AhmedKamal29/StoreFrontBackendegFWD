import client from '../pgdb';

export type Product = {
  id?: number;
  productName: string;
  productPrice: number;
  productCategory: string;
};

export class StoreProducts {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const getAllProducts = 'SELECT * FROM Products';
      const result = await connection.query(getAllProducts);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not retrieve products from the database, Error:  ${error}`
      );
    }
  }

  async show(id: number): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const showProductQuery: string = `SELECT * FROM Products WHERE id=${id}`;
      const result = await connection.query(showProductQuery);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not retrieve product no. ${id} from the database, Error:  ${error}`
      );
    }
  }

  async create(p: Product): Promise<Product> {
    try {
      const newProductquery =
        'INSERT INTO Products (product_name,product_price,product_category) VALUES ($1, $2, $3)  RETURNING *';
      const connection = await client.connect();
      const result = await connection.query(newProductquery, [
        p.productName,
        p.productPrice,
        p.productCategory,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create product, Error:  ${error}`);
    }
  }

  async delete(id: number): Promise<string> {
    try {
      const connection = await client.connect();
      const DeleteSpacificProduct: string = `DELETE FROM Products WHERE id=${id}`;
      await connection.query(DeleteSpacificProduct);
      connection.release();
      return 'sucessfully deleted';
    } catch (error) {
      throw new Error(
        `could not delete product no. ${id} from the database, Error:  ${error}`
      );
    }
  }
}
