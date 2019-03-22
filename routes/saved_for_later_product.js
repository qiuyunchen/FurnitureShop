const express = require('express');
const LaterService = require('../crud_services/saved_for_later_product');
const laterRouter = express.Router();
module.exports = {laterRouter};

laterRouter.post('/', (req, res, next) =>{
    // get req.body info
    const product = {
        product_id: 3,
        user_id: 1,
        quantity: 1,
    }
    LaterService.create(product)
        .then(na =>{
            res.json({success: `Product ${product.product_id} saved for later.`})
        })
        .catch(e =>{
            next(e);
        })
})

laterRouter.get('/:user_id', (req, res, next) =>{
    const {user_id} = req.params;
    LaterService.read(user_id)
        .then( products =>{
            res.json(products);
        })
        .catch(e =>{
            next(e);
        })
})

laterRouter.delete('/:user_id/:product_id', (req, res, next) =>{
    const {user_id, product_id} = req.params;
    LaterService.delete(user_id, product_id)
        .then(na =>{
            res.json({success: `Saved-for-later product ${product_id} for user ${user_id} deleted.`})
        })
        .catch(e =>{
            next(e);
        })
})