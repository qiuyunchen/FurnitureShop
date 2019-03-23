const express = require('express');
const ReviewService = require('../crud_services/review');
const reviewRouter = express.Router();
module.exports = {reviewRouter};

reviewRouter.post('/', (req, res, next) =>{
    //get info from req.body
    const review = {
        product_id: 2, 
        user_id: 5, 
        order_id: 8, 
        rating: 5, 
        comment: 'loved the product 5 stars'
    }
    ReviewService.create(review)
        .then(na =>{
            res.json({success: 'Review created.'})
        })
        .catch( e => {
            next(e);
        })
})

reviewRouter.get('/:product_id', (req, res, next) =>{
    const {product_id} = req.params;
    ReviewService.readByProductId(product_id)
        .then(reviews =>{
            res.json(reviews);
        })
        .catch( e => {
            next(e);
        })
})

reviewRouter.put('/:review_id', (req, res, next) =>{
    const {review_id} = req.params;
    //get review info from req.body
    const review = {
        rating: 4,
        comment: 'took off 1 star for slow shipping'
    }
    ReviewService.updateByReviewId(review_id, review)
        .then(na =>{
            res.json({success: 'Updated review successfully.'})
        })
        .catch( e => {
            next(e);
        })
})

reviewRouter.delete('/:review_id', (req, res, next) =>{
    const {review_id} = req.params;
    ReviewService.delete(review_id)
        .then(na =>{
            res.json({success: `Successfully deleted review ${review_id}.`});
        })
        .catch( e => {
            next(e);
        })
})