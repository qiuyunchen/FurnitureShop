const express = require('express');
const CartProductService = require('../crud_services/cart_product');
const cartRouter = express.Router();
module.exports = {cartRouter};

cartRouter.post('/', (req, res, next) =>{
    //get info from req.body
    const cartProduct = {
        product_id: 1, 
        user_id: 1, 
        quantity: 1,
    };
    CartProductService.create(cartProduct)
        .then(na =>{
            res.json({success: `User ${cartProduct.user_id}'s cart product created.`})
        })
        .catch(e =>{
            next(e);
        })
})

cartRouter.get('/:user_id', (req, res, next) =>{
    const {user_id} = req.params;
    CartProductService.read(user_id)
        .then(cartProducts =>{
            res.json(cartProducts);
        })
        .catch(e =>{
            next(e);
        })
})

cartRouter.delete('/:user_id/:product_id', (req, res, next) =>{
    const {user_id, product_id} = req.params; 
    CartProductService.delete(user_id, product_id)
        .then(na =>{
            res.json({success: `User ${user_id}'s cart product ${product_id} deleted.`})
        })
        .catch(e =>{
            next(e);
        })
})