var express = require('express');

var db = require('./db/db');

const app = express();

app.get('/api/personas', (req, res) => {
    res.status(200).send({
        success: 'True',
        message: 'Personas consultadas',
        personas: db
    })
})

app.get('/api/personas/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.map((personas) => {
        if(personas.id === id){
            return res.status(200).send({
                success: 'True',
                message: 'Persona consultada',
                persona
            })
        }
    });
    return res.status(404).send({
        success: 'False',
        message: 'Persona no encontrada'
    });
});

app.post('/api/personas', (req, res) => {
    if(!req.body.name){
        return res.status(400).send({
            success: 'False',
            message: 'La persona debe tener nombre.'
        })
    }

    const persona = {
        id: db.length + 1,
        name: req.body.name,
        document: req.body.document,
        age: req.body.age
    }

    db.push(persona)

    return res.status(201).send({
        success: 'True',
        message: 'Persona creada con exito',
        persona
    })
})

app.put('/api/personas/:id', (req, res) => {
    const id = parseInt(req.params.id);

    let fueEncontrada = false;
    let personaEncontrada;

    db.map((personas) => {
        if(personas.id === id){
            fueEncontrada = true;
            personaEncontrada = persona;
        }
    });

    if(!fueEncontrada){
        return res.status(404).send({
            success: 'False',
            message: 'La persona no fue encontrada.'
        })
    }

    const personaEditada = {
        id: personaEncontrada.id,
        name: req.body.name || personaEncontrada.name,
        document: req.body.document || personaEncontrada.document,
        age: req.body.age || personaEncontrada.age
    };

    db.splice(id, 1, personaEditada);

    return res.status(200).send({
        success: 'True',
        message: 'Persona modificada con exito',
        personaEditada
    })
})

app.delete('/api/personas/:id', (req, res) => {
    const id = parseInt(req.params.id);

    let fueEncontrada = false;
    let personaEncontrada;

    db.map((personas) => {
        if(personas.id === id){
            fueEncontrada = true;
            personaEncontrada = persona;
        }
    });

    if(!fueEncontrada){
        return res.status(404).send({
            success: 'False',
            message: 'La persona no fue encontrada.'
        })
    }

    db.splice(id, 1)

    return res.status(200).send({
        success: 'True',
        message: 'Persona eliminada con exito'        
    })
})

app.listen(process.env.PORT || 3000)