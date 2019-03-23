const express = require('express');
const OrderService = require('../crud_services/order');
const orderRouter = express.Router();
module.exports = {orderRouter};

orderRouter.post('/', (req, res, next) =>{
    //get order info from req.body
    //ordered_products needs to be stringified json.
    const order = {
        user_id: 1, 
        ordered_products: [{"product_id":"1", "quantity":"4"}, {"product_id":"2", "quantity":"5"}],
    }
    OrderService.create(order)
        .then(na =>{
            res.json({success: 'Order successfully created.'})
        })
        .catch(e =>{
            next(e);
        })
})

orderRouter.get('/:user_id', (req, res, next) =>{
    const {user_id} = req.params;
    OrderService.readByBuyerUserId(user_id)
        .then(orders =>{
            res.json(orders);
        })
        .catch(e =>{
            next(e);
        })
})
