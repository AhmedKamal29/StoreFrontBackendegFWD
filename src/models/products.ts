import client from '../pgdb';

export type Product = {
  id?: number;
  product_name: string;
  product_price: number;
  product_category: string;
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
        p.product_name,
        p.product_price,
        p.product_category,
      ]);
      connection.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not create product, Error:  ${error}`);
    }
  }
  async delete(id: number): Promise<Product[]> {
    try {
      const connection = await client.connect();
      const DeleteSpacificProduct: string = `DELETE FROM Products WHERE id=${id}`;
      const result = await connection.query(DeleteSpacificProduct);
      connection.release();
      return result.rows;
    } catch (error) {
      throw new Error(
        `could not delete product no. ${id} from the database, Error:  ${error}`
      );
    }
  }
  // async RecommendedFive(): Promise<Product[]> {
  //   try {
  //     const connection = await client.connect();
  //     const RecomendationQuery =
  //       'SELECT TOP 5 products_name, products_price FROM Products ORDER BY id DESC LIMIT 5';
  //     const result = await connection.query(RecomendationQuery);
  //     connection.release();
  //     return result.rows;
  //   } catch (error) {
  //     throw new Error(`could not get the top 5 products, Error:  ${error}`);
  //   }
  // }

  // async SortByCategory(category: string): Promise<Product[] | null> {
  //   try {
  //     const connection = await client.connect();
  //     const SortingQuery = 'SELECT * FROM products WHERE category = $1';
  //     const result = await connection.query(SortingQuery, [category]);
  //     connection.release();
  //     if (result.rows.length === 0) {
  //       return null;
  //     }
  //     const products = result.rows;
  //     return products;
  //   } catch (error) {
  //     throw new Error(
  //       `could not retrieve products ordered by the category ${category}, Error:  ${error}`
  //     );
  //   }
  // }
}
