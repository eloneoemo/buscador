const data = require('../data'),
    path = require('path');

const route = (app) =>{
    app.get ('/buscar',(req,res)=>{
        data.obtenerDatos()
        .then((data)=>{
            res.json({'error': false,"datos":JSON.parse(data)});
        })
        .catch((error)=>{
            res.json({'error':true,"datos":error})
        })
    });
    app.get('/opciones', (req, res) => {
        data.obtenerDatos()
        .then((data)=>{
            let ciudades = [];
            let tipo = [];
            var json = JSON.parse(data)
            json.forEach((clave,index) => {                
                if(ciudades.indexOf(clave.Ciudad) <0){
                    ciudades.push(clave.Ciudad);
                }
                if(tipo.indexOf(clave.Tipo) <0 ){
                    tipo.push(clave.Tipo);
                }
            });
            res.json({"error": false, "ciudades": ciudades,"tipos": tipo});
        })
        .catch((err)=>{
            res.json({"error":true,"err":err});
        });
    });
    app.get('/ciudad/:ciudadId/tipo/:tipoId/desde/:desdeVal/hasta/:hastaVal', (req, res) => {
        let params = req.params;
        let datos = [];
        data.obtenerDatos()
            .then(json => {
                var aux = [];
                var arr2 = [];
                var datos = [];
                var data = JSON.parse(json)
                aux = data.slice(); 

                if (params.ciudadId != "todas") {
                    aux.forEach((key, idx) => {
                        if (key.Ciudad == params.ciudadId) {
                            arr2.push(key);
                        }
                    });
                } else {
                    arr2 = aux.slice();
                }
                aux = [];
                aux = arr2.slice();
                arr2 = [];
                if (params.tipoId != "todos") {
                      aux.forEach((key, idx) => {
                        if (key.Tipo == params.tipoId) { arr2.push(key); }
                    });
                } else {
                    arr2 = aux.slice();
                }
                arr2.forEach((key, idx) => {
                    let valor = parseInt(key.Precio.replace("$", "").replace(",", ""));
                    if (valor >= parseInt(params.desdeVal) && valor <= parseInt(params.hastaVal)) {
                        datos.push(key);
                    }
                });
                res.json({ "error": false, "datos": datos });
            })
            .catch((err) => {
                res.json({ "error": true, "err": err });
            });
    });
}

module.exports = route;