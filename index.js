const app = require('./app');
const port = 9000;

app.listen(port, ()=>{
    console.log(`Server listening on port: ${port}`);
})