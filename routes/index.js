const data = require('../data'),
    path = require('path');

const route = (app) =>{
    app.get ('/buscar',(req,res)=>{
        data.obtenerDatos()
        .then((data)=>{
            res.json({'error': false,"datos":data});
        })
        .catch((error)=>{
            res.json({'error':true,"datos":error})
        })
    })
}

module.exports = route;