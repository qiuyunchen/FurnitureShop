const db = require('./dbConnect');
const ReviewService = {};
module.exports = ReviewService;


ReviewService.create = ({product_id, user_id, order_id, rating, comment}) =>{
    const sql = `
        INSERT INTO reviews (product_id, user_id, order_id, rating, comment) VALUES
        ($[product_id]), $[user_id]), $[order_id]), $[rating]), $[comment]))
    `;
    return db.none(sql, {product_id, user_id, order_id, rating, comment});
}

ReviewService.readByProductId = (product_id) =>{
    const sql =`
    SELECT
        *
    FROM reviews
    WHERE
        product_id=$[product_id]
    `;
    return db.any(sql, {product_id});
}

ReviewService.updateByReviewId = (review_id, {rating, comment}) =>{
    const sql = `
        UPDATE reviews
        SET 
            rating=$[rating], 
            comment=$[comment], 
            updatedAt=$[updatedAt]
        WHERE
            review_id=$[review_id]
    `;
    const updatedAt = new Date();
    return db.none(sql, {review_id, rating, comment, updatedAt});
}

ReviewService.delete = (review_id) =>{
    const sql = `
    DELETE FROM reviews WHERE review_id=$[review_id]
    `;
    return db.none(sql, {review_id});
}

