## API Endpoints

#### Products

- Index: `'/products' GET` for getting all the products in table products
- Show: `'/products/product/:id' GET` for getting the requested product from table products
- Create `[token required]: '/products/add' POST` for creating a new product and return it
- Delete: `'/products/product/delete/:id' DELETE` for deleting the requested product

#### Users

- Index [token required]: `'/users' GET` for getting all the users
- Show [token required]: `'/users/:id' GET` for getting the requested user
- Create: `'/users/signUp' POST` for creating a new user
- Login (Auth): `'/users/Login' POST` for logging in and getting a token

#### Orders

- Index: `'/orders' GET` for getting all the orders that exists
- Current Order by user (args: user id)[token required]: `'/orders/user/:id' GET` for getting all of the orders of the requested user
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: `'/orders/user/completed/:id' GET` for getting ONLY completed order for a requested user
- Create Order[token required]: `'/orders/user' POST` for creating a new order
- Add products [token required]: `'/orders/product/add' POST` for adding a product to an existing order

## Data Shapes

#### Product

- id `SERIAL PRIMARY  KEY`
- product_name `VARCHAR`
- product_price `MONEY`
- Product_category `VARCHAR`

#### User

- id `SERIAL PRIMARY KEY`
- fname `VARCHAR`
- lname `VARCHAR`
- password_digest `VARCHAR`

#### Orders

- id `SERIAL PRIMARY KEY`
- user_id `INTEGER`
- order_status `BOOLEAN`
- FOREIGN KEY (user_id) `REFERENCES users(id)`

#### Carts

- id `SERIAL PRIMARY KEY`
- order_id `INTEGER NOT NULL`
- product_id `INTEGER NOT NULL`
- quantity `INTEGER NOT NULL`
- FOREIGN KEY (order_id) `REFERENCES orders (id) ON DELETE CASCADE`
- FOREIGN KEY (product_id) `REFERENCES products (id) ON DELETE CASCADE`
