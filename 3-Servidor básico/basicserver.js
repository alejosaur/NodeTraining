const http = require('http');
const fs = require('fs');

/*
http.createServer((req, res) => {
  res.write('hello world');
  res.end();
}).listen(1310)

console.log(`Server running at http://localhost:1310/`);
*/

http.createServer((req, res) => {

    fs.writeFile("miarchivo.txt", "Hola mundo!", {flag: "a"}, function(err){
        if(err){
            return console.log("Todo salió mal, no se pudo escribir el archivo.");
        }
        
        fs.readFile('miarchivo.txt', function (error, data) {
            if (error) {
                return console.error(error);
            }

            res.write("Asynchronous read: " + data.toString());
            res.end();
        });

    });

  }).listen(1310)
  
  console.log(`Server running at http://localhost:1310/`);