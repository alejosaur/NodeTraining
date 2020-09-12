var fs = require("fs");

fs.unlink("miarchivo.txt", function(err){
    if(err){
        console.log("no pude eliminar el archivo");
        return console.log(err);
    }

    console.log("Archivo eliminado con éxito. =]")
})