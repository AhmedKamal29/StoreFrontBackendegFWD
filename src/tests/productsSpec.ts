import { StoreProducts, Product } from '../models/products';

const ProductStore = new StoreProducts();

describe('Orders and Cart model methods', (): void => {
  describe('Orders and Cart Methods Checking', (): void => {
    it('Show all Orders method should exist', (): void => {
      expect(ProductStore.index).toBeDefined();
    });

    it('Show Orders by a User method should exist', (): void => {
      expect(ProductStore.show(1)).toBeDefined();
    });

    it('Creating orders method should exist', (): void => {
      expect(ProductStore.create).toBeDefined();
    });

    it('Show Completed Orders by a User method should exist', (): void => {
      expect(ProductStore.delete).toBeDefined();
    });
  });

  describe('Orders and Cart model methods', (): void => {
    it('Should return array of orders in table order', async (): Promise<void> => {
      const result = await ProductStore.index();
      expect(result).toBeInstanceOf(Array);
    });

    it('Should return an array of orders by a spacific user ', async (): Promise<void> => {
      const result = await ProductStore.show(1);
      expect(result).toBeInstanceOf(Object);
    });

    it('Should create a new order to the database and return it', async (): Promise<void> => {
      const product: Product = {
        productName: 'iphone 14',
        productPrice: 1000,
        productCategory: 'smartphone',
      };
      const result = await ProductStore.create(product);
      expect(result).toBeInstanceOf(Object);
    });

    it('Should return all the completed orders a spacific user', async (): Promise<void> => {
      const result = await ProductStore.delete(1);
      expect(result).toBeInstanceOf(String);
    });
  });
});
