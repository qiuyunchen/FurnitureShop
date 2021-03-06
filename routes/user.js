const express = require('express');
const UserService = require('../crud_services/user');
const userRouter = express.Router();
module.exports = {userRouter};


// ------------------- user profile routes
userRouter.post('/', (req, res, next) =>{
    // sample data
    // const addr = {
    //     addrLine1: '123 South St',
    //     city: 'Brooklyn',
    //     state: 'NY',
    //     zip: 11223,
    // }
    // const user = {
    //     username: 'test2',
    //     email: 'test2@test.com',
    //     full_name: 'lol',
    //     phone: '123456',
    //     address: JSON.stringify(addr),
    // };
    const {username, email, full_name, phone, address} = req.body
    const user = {username, email, full_name, phone, address}
    UserService.create(user)
        .then( ()=>{
            return UserService.read(username);
        })
        .then(user =>{
            res.json(user);
        })
        .catch(e =>{
            res.json(e)
        })
})

userRouter.get('/:username', (req, res, next) =>{
    const {username} = req.params;
    UserService.read(username)
        .then(users => {
            users[0] ? 
            res.json(users[0])
            : 
            res.json({Error: `Username ${username} does not exist.`})
        })
        .catch(e => next(e));
})

userRouter.put('/:user_id', (req, res, next) =>{
    const {user_id} = req.params;
    // get info from req.body and pass in as argument for update func
    // const dummyData = {
    //     user_id, 
    //     username:'lol', 
    //     email:'lol@lol.com', 
    //     full_name:'lolol', 
    //     phone:'123', 
    //     address: {"some":"json"},
    // }
    const {username, email, full_name, phone, address} = req.body;
    const user = {user_id, username, email, full_name, phone, address}
    UserService.update(user)
        .then(()=>{
            res.status(200)
            .json({success: `User ID ${user_id} updated to ${username}.`})
        })
        .catch(e =>{
            res.json({Error: `User ID ${user_id} cannot be updated. Either the id is invalid or something else went wrong.`})
        })
})

userRouter.delete('/:user_id', (req, res, next) =>{
    const {user_id} = req.params;
    UserService.delete(user_id)
        .then( () =>{
            res.status(200)
            .json({success: `User ${user_id} deleted.`})
        })
        .catch( e =>{
            res.json({Error: `User ${user_id} was not deleted. Either the id doesn't exist or something else went wrong.`})
        })
})