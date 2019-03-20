DROP DATABASE IF EXISTS furniture;
CREATE DATABASE furniture;

\c furniture;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR NULL,
    phone INT NULL,
    address JSON NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE stores (
    store_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    store_name VARCHAR UNIQUE NOT NULL,
    store_logo VARCHAR NULL,
    store_desc VARCHAR NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    order_total NUMERIC NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    store_id INT REFERENCES stores(store_id) NULL,
        FOREIGN KEY (store_id) 
        REFERENCES stores(store_id)
        ON DELETE CASCADE,
    product_name VARCHAR NOT NULL,
    product_desc VARCHAR NOT NULL,
    product_price NUMERIC NOT NULL,
    product_imgs JSON NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE cart_products (
    product_id INT REFERENCES products(product_id) NOT NULL,
    user_id INT REFERENCES users(user_id) NOT NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    quantity INT NOT NULL
);

CREATE TABLE saved_for_later_products (
    product_id INT REFERENCES products(product_id) NOT NULL,
    user_id INT REFERENCES users(user_id) NOT NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE,
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
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    order_id INT REFERENCES orders(order_id) NOT NULL,
    rating VARCHAR NULL,
    comment VARCHAR NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO users (username, email) VALUES 
('qq', 'qq@qq.com'),
('Mo', 'mo@mo.com');

INSERT INTO stores (user_id, store_name) VALUES
('1', 'Qs Shop'),
('1', 'Managed By Q'),
('2', 'Mo Tables');
