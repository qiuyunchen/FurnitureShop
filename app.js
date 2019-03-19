const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/ping', (req, res)=>{
    res.json({pong: true});
})

module.exports = app;