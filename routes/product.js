const express = require('express');
const ProductService = require('../crud_services/product');
const productRouter = express.Router();
module.exports = {productRouter};

productRouter.post('/', (req, res, next) =>{
    // get product from req.body
    const product = {
        store_id: 4, 
        product_name: 'chair', 
        product_desc: 'awesome chair', 
        product_price: 50.50, 
        product_imgs: [{"img1":"firebase url 1"},{"img2":"firebase url 2"}],
    }
    ProductService.create(product)
        .then(na =>{
            res.json({success: `Product ${product.product_name} successfully created.`})
        })
        .catch(e =>{
            next(e);
        })
})

productRouter.get('/:product_id', (req, res, next) =>{
    const {product_id} = req.params;
    ProductService.read(product_id)
        .then(product =>{
            res.json(product);
        })
        .catch(e =>{
            next(e);
        })
})

productRouter.put('/:product_id', (req, res, next) =>{
    const {product_id} = req.params;
    // get this from req.body
    const updatedProduct = {
        product_name: 'chair', 
        product_desc: 'awesome chair', 
        product_price: 50.50, 
        product_imgs: [{"img1":"firebase url 1"},{"img2":"firebase url 2"}],
    }
    ProductService.update(product_id, updatedProduct)
        .then(na =>{
            res.json({success: `Product ${product_id} successfully updated.`});
        })
        .catch(e =>{
            next(e);
        })
})

productRouter.delete('/:product_id', (req, res, next) =>{
    const {product_id} = req.params;
    ProductService.delete(product_id)
        .then(na =>{
            res.json({success: `Product ${product_id} successfully deleted.`});
        })
        .catch(e =>{
            next(e);
        })
})