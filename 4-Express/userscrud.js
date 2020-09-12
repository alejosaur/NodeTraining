var express = require('express');
var app = express();
   
var sql = require("mssql");

// config for your database
var config = {
    "user": "sa", //default is sa
    "password": "12345678901234567890",
    "server": "localhost", // for local machine
    "database": "local_db", // name of database
    "port": 1434,
    "options": {
        "encrypt": true
    }
  }

  app.use(express.json());

app.get('/Persona', function (req, res) {

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Persona', function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset.recordset);
            
        });
    });
});

app.get('/Persona/:id', function (req, res) {

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('select * from Persona where Id = ' + req.params.id, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send(recordset.recordset);
            
        });
    });
});

app.post('/Persona', function (req, res) {

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        var persona = req.body;
        console.log(req);
        var query = "INSERT INTO [dbo].[Persona] ([Nombre] ,[Apellido] ,[FechaNacimiento] ,[TipoDocumento] ,[NumeroDocumento]) VALUES ('"+persona.Nombre+"', '"+persona.Apellido+"' ,'"+persona.FechaNacimiento+"' ,'"+persona.TipoDocumento+"' ,'"+persona.NumeroDocumento+"')";
        console.log(query);
        // query to the database and get the records
        request.query(query, function (err) {
            
            if (err) console.log(err)

            request.query("select * from Persona where Nombre = '"+persona.Nombre+"' AND Apellido = '"+persona.Apellido+"' AND TipoDocumento = '"+persona.TipoDocumento+"' AND NumeroDocumento = '"+persona.NumeroDocumento+"'", function (err, recordset) {
            
                if (err) console.log(err)
    
                // send records as a response
                res.send(recordset.recordset[0]);
                
            });
            
        });
    });
});

app.put('/Persona/:id', function (req, res) {

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        var persona = req.body;
        console.log(req);
        var query = "UPDATE [dbo].[Persona] SET [Nombre] = '"+persona.Nombre+"' ,[Apellido] = '"+persona.Apellido+"' ,[FechaNacimiento] = '"+persona.FechaNacimiento+"' ,[TipoDocumento] = '"+persona.TipoDocumento+"' ,[NumeroDocumento] = '"+persona.NumeroDocumento+"' WHERE ID ='"+req.params.id+"'";
        console.log(query);
        // query to the database and get the records
        request.query(query, function (err) {
            
            if (err) console.log(err)

            request.query("select * from Persona WHERE ID ='"+req.params.id+"'", function (err, recordset) {
            
                if (err) console.log(err)
    
                // send records as a response
                res.send(recordset.recordset[0]);
                
            });
            
        });
    });
});

app.delete('/Persona/:id', function (req, res) {

    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
           
        // query to the database and get the records
        request.query('delete from Persona where Id = ' + req.params.id, function (err, recordset) {
            
            if (err) console.log(err)

            // send records as a response
            res.send({"success":1});
            
        });
    });
});


var server = app.listen(5000, function () {
    console.log('Server is running..');
});
