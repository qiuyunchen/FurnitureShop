const app = require('express')();
const bodyParser = require('body-parser');
const {userRouter} = require('./routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/user', userRouter);


module.exports = app;