const fs = require('fs'),
    path = require('path');

module.exports = {
    obtenerDatos : () => {
        let urlData = __dirname + path.join('/data.json');
        return new Promise ((resolve, reject) =>{
            fs.readFile(urlData,'utf8',(err,dataRead)=>{
                if(err) reject (err)
                resolve(dataRead);
            })
        });
    }
};