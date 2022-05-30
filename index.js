var express = require('express')
var mysql = require('mysql')
var app  = express();
var connect = require('./db')
var bodyParser = require('body-parser')
var csv = require('csvtojson')
var fileUpload = require('express-fileupload');

app.use(bodyParser.urlencoded({ extended: false }))


app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

app.listen(8000, function(){
    console.log("Aplicacion funcionando en el puerto 8000");
   
})


app.get('/', function(req,res){


    let query = `SELECT * FROM usuario`
    connect.query(query, function(err, result){
        if(err) throw err;
        res.send(result)

    });

    // connect.connect(function(err){
    //     if(err) res.send("nok");
    //     console.log("Conexion establecida con la base de datos")
    //     res.send('ok')
    // })
})


app.post('/', function(req,res){

    console.log("asdjalsd")


    console.log(req.body)

    const {nombreDeUsuario, clave, idEvento} = req.body
    
    
    let query = `SELECT * FROM usuario WHERE nombreDeUsuario = ${nombreDeUsuario} and clave = ${clave} and idEvento = ${idEvento}`
    connect.query(query, function(err, result){
        if(err) throw err;
        if (!result.length) {
            query = `INSERT INTO usuario (nombreDeUsuario, clave, idEvento )VALUES (${nombreDeUsuario},${clave},${idEvento});`
            connect.query(query, function(err, result){
                if(err) throw err;
                
        
            });
            res.send('ok')
        } 

        res.send('nok')
        
    });
    
})

app.post('/login', function(req,res){
    console.log(req.body)

    const {nombreDeUsuario, clave, idEvento} = req.body
    
    
    let query = `SELECT * FROM usuario WHERE nombreDeUsuario = ${nombreDeUsuario} and clave = ${clave} and idEvento = ${idEvento}`
    connect.query(query, function(err, result){
        if(err) throw err;
        if (!result.length) {
            res.send('nok')
        } 

        query = `SELECT idUsuario FROM usuario WHERE nombreDeUsuario = ${nombreDeUsuario} and clave = ${clave} and idEvento = ${idEvento}`
        connect.query(query, function(err, result){
            if(err) throw err;

            
            res.send(Object.values(result[0])); 
        });   
    });
    
})

app.delete('/', function(req,res){
    
    
    let query = `DELETE FROM usuario;`
    connect.query(query, function(err, result){
        if(err) throw err;

        res.send("Todos los usuarios eliminados")
    });
    
})

app.post('/import', async (req, res) => {
    const { users } = req.files;

    const jsonUsers = await csv().fromFile(users.tempFilePath)



    jsonUsers.forEach(e => {
        query = `INSERT INTO usuario (nombreDeUsuario, clave, idEvento )VALUES (${e.nombreDeUsuario},${e.clave},${e.idEvento});`
            connect.query(query, function(err, result){
                if(err) throw err;
        
            });
        
    });

    res.send("ok")
    
})



