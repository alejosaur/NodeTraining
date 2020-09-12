var fs = require('fs')

//Acá primero mostrar sin flag
fs.writeFile("miarchivo.txt", "Hola mundo!", {flag: "a"}, function(err){
    if(err){
        return console.log("Todo salió mal, no se pudo escribir el archivo.");
    }

    console.log("¡Archivo creado satisfactoriamente! =]")
})
