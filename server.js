const express = require('express'),
    app = express();
    bodyParser = require('body-parser'),
    route = require('./routes');

route(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

app.listen(3000,()=>{
    console.log('Escuchando en el puerto 3000');
}) 