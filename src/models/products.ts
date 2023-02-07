import client from '../pgdb';

export type Product = {
  id: number;
  product_name: string;
  product_price: number;
  Product_category: string;
  Product_demand: number | null;
};

export class storeProducts {
  async index(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql = 'SELECT * FROM Products';
      const result = await connection.query(sql);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not retrieve products from the database, Error:  ${error}`
      );
    }
  }

  async show(id: string): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const sql: string = `SELECT * FROM Products WHERE id=${id}`;
      const result = await connection.query(sql);
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
      const connection = await client.connect();
      const newProductquery =
        'INSERT INTO products (name,price,category) VALUES ($1, $2, $3)';
      const result = await connection.query(newProductquery, [
        p.product_name,
        p.product_price,
        p.Product_category,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create product, Error:  ${error}`);
    }
  }

  async RecommendedFive(): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const query =
        'SELECT TOP 5 products_name, products_price FROM Products ORDER BY id DESC LIMIT 5';
      const result = await connection.query(query);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(`could not get the top 5 products, Error:  ${error}`);
    }
  }

  async SortByCategory(category: string): Promise<Product[] | null> {
    try {
      const connection = await client.connect();
      const query = 'SELECT * FROM products WHERE category = $1';
      const result = await connection.query(query, [category]);
      connection.release();
      if (result.rows.length === 0) {
        return null;
      }
      const products = result.rows;
      return products;
    } catch (error) {
      throw new Error(
        `could not retrieve products ordered by the category ${category}, Error:  ${error}`
      );
    }
  }
}
