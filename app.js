const {userRouter} = require('./routes/user');
const {cartRouter} = require('./routes/cart_product');
const {orderRouter} = require('./routes/order');
const {productRouter} = require('./routes/product');
const {reviewRouter} = require('./routes/review');
const {laterRouter} = require('./routes/saved_for_later_product');
const {storeRouter} = require('./routes/store');

const app = require('express')();
const bodyParser = require('body-parser');

// middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// express router
app.use('/user', userRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/product', productRouter);
app.use('/review', reviewRouter);
app.use('/later', laterRouter);
app.use('/store', storeRouter);

module.exports = app;