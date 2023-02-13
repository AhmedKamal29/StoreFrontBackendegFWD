import { StoreUsers } from '../../models/users';
import { StoreOrders, Order } from '../../models/orders';

const userStore = new StoreUsers();
const orderStore = new StoreOrders();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(userStore.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(userStore.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(userStore.create).toBeDefined();
  });

  it('should have a User Products that belong to Order method', () => {
    expect(userStore.authenticate).toBeDefined();
  });

  it('create method should add a new user', async () => {
    const result = await userStore.create({
      fname: 'ahmed',
      lname: 'kamal',
      PasswordDigest: '123456',
    });
    expect(result.fname).toEqual('ahmed');
    expect(result.lname).toEqual('kamal');
  });

  it('index method should return a list of all users', async () => {
    const result = await userStore.index();
    expect(result[0].fname).toEqual('ahmed');
    expect(result[0].lname).toEqual('kamal');
  });

  it('Show method should return the requested user', async () => {
    const result = await userStore.show(1);
    expect(result.id).toEqual(1);
    expect(result.fname).toEqual('ahmed');
    expect(result.lname).toEqual('kamal');
  });
  it('Should create a new order to the database and return it', async (): Promise<void> => {
    const order: Order = {
      // eslint-disable-next-line camelcase
      user_id: 1,
      // eslint-disable-next-line camelcase
      order_status: true,
    };
    const result = await orderStore.create(order);
    expect(result).toBeInstanceOf(Object);
  });
});
