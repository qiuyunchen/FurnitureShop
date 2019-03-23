const db = require('./dbConnect');
const CartProductService = {};
module.exports = CartProductService;

CartProductService.create = ({product_id, user_id, quantity}) =>{
    const sql = `
        INSERT INTO cart_products (product_id, user_id, quantity) VALUES
        ($[product_id]), $[user_id]), $[quantity]))
    `;
    return db.none(sql, {product_id, user_id, quantity});
}

CartProductService.read = (user_id) =>{
    const sql =`
    SELECT
        *
    FROM cart_products
    INNER JOIN products
    ON cart_products.product_id = products.product_id
    WHERE
        user_id=$[user_id]
    `;
    return db.any(sql, {user_id});
}

CartProductService.delete = (user_id, product_id) =>{
    const sql = `
    DELETE FROM cart_products 
    WHERE 
        user_id=$[user_id] 
    AND 
        product_id=$[product_id]
    `;
    return db.none(sql, {user_id, product_id});
}

