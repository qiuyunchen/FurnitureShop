const db = require('./dbConnect');
const ProductService = {};
module.exports = ProductService;

ProductService.create = ({store_id, product_name, product_desc, product_price, product_imgs}) =>{
    const sql = `
        INSERT INTO products (store_id, product_name, product_desc, product_price, product_imgs) VALUES
        ($[store_id]), $[product_name]), $[product_desc]), $[product_price]), $[product_imgs]))
    `;
    return db.none(sql, {store_id, product_name, product_desc, product_price, product_imgs});
}

ProductService.read = (product_id) =>{
    const sql =`
    SELECT
        *
    FROM products
    WHERE
        LOWER(product_id)=$[product_id]
    `;
    return db.one(sql, {product_id: product_id.toLowerCase() });
}

ProductService.update = (product_id, {product_name, product_desc, product_price, product_imgs}) =>{
    const sql = `
        UPDATE products
        SET
            product_id=$[product_id], 

            updatedAt=$[updatedAt]
        WHERE
            product_id=$[product_id]
    `;
    const updatedAt = new Date();
    return db.none(sql, {product_id, updatedAt});
}

ProductService.delete = (product_id) =>{
    const sql = `
    DELETE FROM products WHERE product_id=$[product_id]
    `;
    return db.none(sql, {product_id});
}
