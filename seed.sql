DROP DATABASE IF EXISTS furniture;
CREATE DATABASE furniture;

\c furniture;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    token VARCHAR UNIQUE NULL,
    full_name VARCHAR NULL,
    phone INT NULL,
    address VARCHAR NULL,
    city VARCHAR NULL,
    state VARCHAR NULL,
    zip INT NULL,
    createdAt VARCHAR NOT NULL,
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE stores (
    store_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    store_name VARCHAR NOT NULL,
    store_logo VARCHAR NULL,
    store_desc VARCHAR NULL,
    createdAt VARCHAR NOT NULL,
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NULL,
    order_total NUMERIC NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    store_id INT REFERENCES stores(store_id) NOT NULL,
    product_name VARCHAR NOT NULL,
    product_desc VARCHAR NOT NULL,
    product_price NUMERIC NOT NULL,
    createdAt VARCHAR NOT NULL,
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE images (
    img_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) NOT NULL,
    img_url VARCHAR NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE cart_products (
    product_id INT REFERENCES products(product_id) NOT NULL,
    user_id INT REFERENCES users(user_id) NOT NULL,
    quantity INT NOT NULL
);

CREATE TABLE saved_for_later_products (
    product_id INT REFERENCES products(product_id) NOT NULL,
    user_id INT REFERENCES users(user_id) NOT NULL,
    quantity INT NOT NULL
);

CREATE TABLE ordered_products (
    order_id INT REFERENCES orders(order_id) NOT NULL,
    product_id INT REFERENCES products(product_id) NOT NULL,
    quantity INT NOT NULL
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    product_id INT REFERENCES products(product_id) NOT NULL,
    user_id INT REFERENCES users(user_id) NOT NULL,
    order_id INT REFERENCES orders(order_id) NOT NULL,
    rating VARCHAR NULL,
    comment VARCHAR NULL,
    createdAt VARCHAR NOT NULL,
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (username, email, createdAt) VALUES 
('qq', 'qq@qq.com', 'March 19, 2019'),
('Mo', 'mo@mo.com', 'March 19, 2019');

INSERT INTO stores (user_id, store_name, createdAt) VALUES
('1', 'Qs Shop', 'March 19, 2019'),
('1', 'Managed By Q', 'March 20, 2019'),
('2', 'Mo Tables', 'March 20, 2019');
