const express = require('express');
const app = express();
const fs = require('fs');
const Jimp = require('jimp')

app.listen(8080, () => {
    console.log('El servidor está inicializado en el puerto 8080')
});
//Disponibilizar ruta Servidor
app.get('/', (req, res)=> {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('index.html', 'utf-8', (err,html )=> {
        res.end(html);
    });
});

app.get('/style', (req, res)=> {
    res.writeHead(200, {'Content-Type': 'text/css'});
    fs.readFile(__dirname+ '/assets/css/style.css', (err,css )=> {
        res.end(css);
    })
})

app.get('/imagen', (req,res)=>{

    const {imagen: imgUrl} = req.query
    Jimp.read(`${imgUrl}`,(err,imagen)=>{
        imagen.resize(350, Jimp.AUTO)
        .grayscale()
        .quality(60)
        .writeAsync('imagen.png').then(()=>{
            res.writeHead(200,{'Contnt-Type': 'image/png'});
            fs.readFile('imagen.png', (err, data)=>{
                res.end(data)
            })
        }) 
    })
});
