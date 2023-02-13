import { StoreProducts, Product } from '../models/products';

const ProductStore = new StoreProducts();

describe('Products model methods', (): void => {
  describe('products Methods Checking', (): void => {
    it('Show all products method should exist', (): void => {
      expect(ProductStore.index).toBeDefined();
    });

    it('Show products by product id method should exist', (): void => {
      expect(ProductStore.show(1)).toBeDefined();
    });

    it('Creating product method should exist', (): void => {
      expect(ProductStore.create).toBeDefined();
    });

    it('deleting product method should exist', (): void => {
      expect(ProductStore.delete).toBeDefined();
    });
  });

  describe('product model methods', (): void => {
    it('Should return array of products in table profucts', async (): Promise<void> => {
      const result = await ProductStore.index();
      expect(result).toBeInstanceOf(Array);
    });

    it('Should return an objecting containing the product requsted ', async (): Promise<void> => {
      const result = await ProductStore.show(1);
      expect(result).toBeInstanceOf(Object);
    });

    it('Should create a new o product to the database and return it', async (): Promise<void> => {
      const product: Product = {
        productName: 'iphone 14',
        productPrice: 1000,
        productCategory: 'smartphone',
      };
      const result = await ProductStore.create(product);
      expect(result).toBeInstanceOf(Object);
    });

    it('Should delete a product', async (): Promise<void> => {
      const result = await ProductStore.delete(1);
      expect(result).toBeInstanceOf(String);
    });
  });
});
