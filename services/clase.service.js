// Gettign the Newly created Mongoose Model we just created 

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

// Saving the context of this module inside the _the variable
_this = this

exports.createClase = async function (clase) {
    var newClase = new clase({
        idProfesor: clase.idProfesor,
        profesor: clase.profesor,
        materia: clase.materia,
        duracion: clase.duracion,
        frequencia: clase.frequencia,
        costo: clase.costo,
        clasificacion: 0,
        estadoClase: "publica",
        alumnos: [],
        comentarios: []
    })
    try {
        // Saving the User 
        var savedClase = await newClase.save();
        var token = jwt.sign({
            id: savedClase._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Clase")
    }
}

exports.getComentarios = async function (clase) {}
exports.modificarEstado = async function (clase) {}
exports.eliminarClase = async function (clase) {}
exports.getClases = async function (clase) {}
exports.modificarClase = async function (clase) {}
