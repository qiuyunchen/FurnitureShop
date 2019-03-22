const db = require('./dbConnect');
const OrderService = {};
module.exports = OrderService;


OrderService.create = (user_id, ordered_products, order_total) =>{
    const sql = `
        INSERT INTO orders (user_id, ordered_products, order_total) VALUES
        ($[user_id]), $[ordered_products]), $[order_total]))
    `;
    return db.none(sql, {user_id, ordered_products, order_total});
}

OrderService.readByBuyer = (user_id) =>{
    const sql =`
    SELECT
        *
    FROM orders
    WHERE
        user_id=$[user_id]
    `;
    return db.any(sql, {user_id});
}

//how to read by store name?
