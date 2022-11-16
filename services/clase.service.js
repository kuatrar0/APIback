// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/Clase.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

exports.createClase = async function (Clase) {
    var newClase = new Clase({
        profesor: Clase.profesor,
        materia: Clase.materia,
        duracion: Clase.duracion,
        frequencia: Clase.frequencia,
        costo: Clase.frequencia,
        clasificacion: Clase.clasificacion,
        comentario:{
            nombre: Clase.comentario.nombre,
            fechaPubli: Clase.comentario.fechaPubli,
            comentario: Clase.comentario.comentarioTexto
        },
        alumnos:{
            nombres: Clase.alumnos.participantes

        },
        estadoClase: Clase.estadoClase

    })


}