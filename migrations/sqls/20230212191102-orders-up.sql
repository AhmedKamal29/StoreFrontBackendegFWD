/* Replace with your SQL commands */
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    order_status BOOLEAN,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
