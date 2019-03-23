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
    user_id INT NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    ordered_products JSON NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    store_id INT NULL,
        FOREIGN KEY (store_id) 
        REFERENCES stores(store_id)
        ON DELETE CASCADE,
    product_name VARCHAR NOT NULL,
    product_categ VARCHAR NOT NULL,
    product_desc VARCHAR NOT NULL,
    product_price NUMERIC NOT NULL,
    product_imgs JSON NOT NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE cart_products (
    product_id INT NOT NULL,
        FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE CASCADE,
    user_id INT NOT NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    quantity INT NOT NULL
);

CREATE TABLE saved_for_later_products (
    product_id INT NOT NULL,
        FOREIGN KEY (product_id)
        REFERENCES products(product_id)
        ON DELETE CASCADE,
    user_id INT REFERENCES users(user_id) NOT NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    quantity INT NOT NULL
);

CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    product_id INT NOT NULL,
        FOREIGN KEY (product_id) 
        REFERENCES products(product_id)
        ON DELETE CASCADE,
    user_id INT NOT NULL,
        FOREIGN KEY (user_id) 
        REFERENCES users(user_id)
        ON DELETE CASCADE,
    order_id INT NOT NULL,
        FOREIGN KEY (order_id)
        REFERENCES orders(order_id)
        ON DELETE CASCADE,
    rating VARCHAR NULL,
    comment VARCHAR NULL,
    createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
    updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
);