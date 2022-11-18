// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/Clase.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

exports.createClase = async function (clase) {
    var newClase = new clase({
        idProfesor:clase.idProfesor,
        profesor:clase.profesor,
        materia: clase.materia,
        duraciom: clase.duraciom,
        frequencia: clase.frequencia,
        costo: clase.costo,
        clasificacion: clase.clasificacion,
        estadoClase: clase.estadoClase,
        alumnos: clase.alumnos,
        comentarios: clase.comentarios

    })


}