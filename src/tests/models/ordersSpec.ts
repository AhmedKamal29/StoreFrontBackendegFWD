import { StoreOrders } from '../../models/orders';

const orderStore = new StoreOrders();

describe('Orders and Cart model methods', (): void => {
  describe('Orders and Cart Methods Checking', (): void => {
    it('Show all Orders method should exist', (): void => {
      expect(orderStore.index).toBeDefined();
    });

    it('Show Orders by a User method should exist', (): void => {
      expect(orderStore.show(1)).toBeDefined();
    });

    it('Creating orders method should exist', (): void => {
      expect(orderStore.create).toBeDefined();
    });

    it('Show Completed Orders by a User method should exist', (): void => {
      expect(orderStore.showCompleted).toBeDefined();
    });
  });

  describe('Orders and Cart model methods', (): void => {
    it('Should return array of orders in table order', async (): Promise<void> => {
      const result = await orderStore.index();
      expect(result).toBeInstanceOf(Array);
    });

    it('Should return an array of orders by a spacific user ', async (): Promise<void> => {
      const result = await orderStore.show(1);
      expect(result).toBeInstanceOf(Object);
    });

    it('Should return all the completed orders a spacific user', async (): Promise<void> => {
      const result = await orderStore.showCompleted(1);
      expect(result).toBeInstanceOf(Object);
    });
  });
});
