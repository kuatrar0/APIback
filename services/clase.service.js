// Gettign the Newly created Mongoose Model we just created 

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Clase = require('../models/Clase.model');

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

exports.getComentarios = async function (query) {
    try{ 
        var Clase = await Clase.paginate(query)
        return Clase.comentarios
    }
    catch(e){
        console.log("error services", e)
        throw Error('Error while Paginating Clases');
    }
}
exports.modificarClase = async function (clase) {
    var id = clase._id 

    try {
        //Find the old User Object by the Id
        var oldClase = await Clase.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    // If no old User Object exists return false
    if (!oldClase) {
        return false;
    }
    //Edit the User Object
    oldClase.duracion = clase.duracion
    oldClase.frequencia = clase.frequencia
    oldClase.costo = clase.costo
    try {
        var savedClase = await oldClase.save()
        return savedClase;
    } catch (e) {
        throw Error("And Error occured while updating the Clase");
    }
}



exports.eliminarClase = async function (id) {
    try {
        var deleted = await Clase.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Clase Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Clase")
    }
}
exports.getClases = async function (query) {
    try {
        console.log("Query", query)
        var Clases = await Clases.paginate(query)
        // Return the Userd list that was retured by the mongoose promise
        return Clases;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while getting Clases');
    }
}
exports.modificarEstado = async function (clase) {
    var id = clase._id 

    try {
        //Find the old User Object by the Id
        var oldClase = await Clase.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    // If no old User Object exists return false
    if (!oldClase) {
        return false;
    }
    //Edit the User Object
    oldClase.estadoClase = clase.estadoClase
    try {
        var savedClase = await oldClase.save()
        return savedClase;
    } catch (e) {
        throw Error("And Error occured while updating the Clase");
    }
}
