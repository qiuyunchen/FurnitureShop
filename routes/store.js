const express = require('express');
const StoreService = require('../crud_services/store');
const storeRouter = express.Router();
module.exports = {storeRouter};

storeRouter.post('/', (req, res, next) =>{
    // get data from req.body & put in newStore
    const newStore = {
        user_id: 2, 
        store_name: 'Mo Chairs', 
        store_logo: 'logo url', 
        store_desc: 'mos startup chairs'
    };

    StoreService.create(newStore)
        .then( na =>{
            res.json({success: 'Store created.'})
        })
        .catch( e =>{
            next(e);
        })
})

storeRouter.get('/:store_name', (req, res, next) =>{
    const {store_name} = req.params;
    StoreService.read(store_name)
        .then(store =>{
            res.json(store);
        })
        .catch( e =>{
            next(e);
        })
})

storeRouter.put('/:store_id', (req, res, next) =>{
    const {store_id} = req.params;
    //get info from req.body
    const updatedStore = {
        store_id: 2, 
        store_name: 'Mo Chairs', 
        store_logo: 'logo url', 
        store_desc: 'mos magnificent startup chairs'
    };

    StoreService.update(updatedStore)
        .then(na =>{
            res.json({success: 'Store updated.'})
        })
        .catch( e =>{
            next(e);
        })
})

storeRouter.delete('/:store_id', (req, res, next) =>{
    const {store_id} = req.params;
    StoreService.delete(store_id)
        .then(na =>{
            res.json({success: 'Store deleted.'})
        })
        .catch( e =>{
            next(e);
        })
})