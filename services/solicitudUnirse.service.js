// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');

var jwt = require('jsonwebtoken');
const Clase = require('../models/Clase.model');
const SolicitudUnirse = require('../models/SolicitudUnirse.model');

// Saving the context of this module inside the _the variable
_this = this


exports.createSolicitudUnirse = async function (solicitudUnirse) {
    // Creating a new Mongoose Object by using the new keyword
    var nuevaSolicitud = new SolicitudUnirse({
        claseID: solicitudUnirse.claseID,
        alumnoID: solicitudUnirse.alumnoID,
        solicitud: solicitudUnirse.solicitud,
        horario: solicitudUnirse.horario,
        estado: "pendiente"
        
    })
    
    try {
        // Saving the User 
        var savedSolicitudNueva = await nuevaSolicitud.save();
        var token = jwt.sign({
            id: savedSolicitudNueva._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)    
        throw Error("Error while Creating Solicitud")
    }
}




exports.aceptarSolicitud = async function (solicitud) {

    try {
        //Find the old User Object by the Id
        var controlSol = await SolicitudUnirse.findById(solicitud);

    } catch (e) {
        throw Error("Error occured while Finding the Solicitud")
    }
    if (!controlSol) {
        return false;
    }
    try {
        //Find the old User Object by the Id
        var usuarioAUnir = await User.findById(controlSol.alumnoID);
    } catch (e) {
        throw Error("Error occured while Finding the Solicitud")
    }
    // If no old User Object exists return false
    if (!usuarioAUnir) {
        return false;
    }
    try {
        //Find the old User Object by the Id
        var claseAUnir = await Clase.findById(controlSol.claseID);
    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    // If no old User Object exists return false
    if (!claseAUnir || claseAUnir.eliminado == true || claseAUnir.estadoClase == "oculta") {
        return false;
    }

    claseAUnir.alumnos = claseAUnir.concat([{
        idAlu: usuarioAUnir._id,
        nombreAlu: usuarioAUnir.nombre,
        baja: false
    }])
    usuarioAUnir.clasesAnotado = usuarioAUnir.clasesAnotado.concat([{
        idclase: claseAUnir._id,
        idProfesor: claseAUnir._idProfesor,
        estadoDeClase: "aceptada",
        baja: false
    }])
    try {
        var controlUser = await usuarioAUnir.save()
        var controlClase = await claseAUnir.save()
    } catch (e) {
        throw Error("And Error occured while updating the UserSolicitud" );
    }
    try {
        controlSol.estado = "aprobado"
        var savedSolicitud = await controlSol.save()
        return savedSolicitud;
    } catch (e) {
        throw Error("And Error occured while updating the Solicitud");
    }
}

exports.rechazarSolicitud = async function (solicitudRechazada) {
    try {
        //Find the old User Object by the Id
        var solRechaz = await SolicitudUnirse.findById(solicitudRechazada);

    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    if (!solRechaz) {
        return false;
    }
    try {
        solRechaz.estado = "rechazada"
        var savedSolicitud = await solRechaz.save()
        return savedSolicitud;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.getSolicitudesByClaseID = async function (query) {

    // Options setup for the mongoose paginate
   
    // Try Catch the awaited promise to handle the error 
    try{ 
        var Solicitudes = await SolicitudesUnirse.paginate(query)
        return Solicitudes
    }
    catch(e){
        console.log("error services", e)
        throw Error('Error while Paginating Clases');
    }
}