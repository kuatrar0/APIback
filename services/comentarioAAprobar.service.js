// Gettign the Newly created Mongoose Model we just created 

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const ComentarioAAprobar = require('../models/ComentariosAAprobar.model');

// Saving the context of this module inside the _the variable
_this = this

exports.createComentarioAAprobar = async function (ComentarioSolicitud) {
    var newComentatarioAAprobar = new ComentarioAAprobar({
        claseID: ComentarioSolicitud.claseID ,
        alumnoID: ComentarioSolicitud.alumnoID,
        nombreAlumnoID: ComentarioSolicitud.nombreAlumnoID,
        comentario:  ComentarioSolicitud.comentario,
        clasificacion:  ComentarioSolicitud.clasificacion,
        estado: "pendiente", //puede ser Pendiente, Aprobado o Rechazado
        razonDeRechazo: null
    })
    try {
        // Saving the User 
        var savedComentarioAAprobar = await newComentarioAAprobar.save();
        var token = jwt.sign({
            id: savedComentarioAAprobar._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Comentario A Aprobar")
    }
}

exports.rechazarComentario = async function (ComentarioRechazado) { 
    var id = ComentarioRechazado._id
    try {
        //Find the old User Object by the Id
        var oldComentario = await ComentarioAAprobar.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the Comentario")
    }
    // If no old User Object exists return false
    if (!oldComentario) {
        return false;
    }
    //Edit the User Object
    oldComentario.estado = "rechazado"
    oldComentario.razonDeRechazo = ComentarioRechazado.razonDeRechazo
    try {
        var savedClase = await oldClase.save()
        return savedClase;
    } catch (e) {
        throw Error("And Error occured while updating the Clase");
    }

}
exports.aprobarComentario= async function (ComentarioAprobado) {
    var idComentario = ComentarioAprobado._id 

    try {
        //Find the old User Object by the Id
        var oldComentarioAAprobar = await ComentarioAAprobar.findOne(idComentario);
    } catch (e) {
        throw Error("Error occured while Finding the comentario")
    }
    // If no old User Object exists return false
    if (!oldComentarioAAprobar) {
        return false;
    }
    //Edit the User Object
    oldComentarioAAprobar.estado = "aprobado"
    try {
        //Find the old User Object by the Id
        var claseAComentar = await Clase.findById(ComentarioAprobado.claseID);
    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    // If no old User Object exists return false
    if (!claseAComentar || claseAComentar.eliminado == true ) {
        return false;
    }
    claseAComentar.comentarios= claseAComentar.concat([{
        idAlu : ComentarioAprobado.alumnoID,
        nombreAlu: ComentarioAprobado.alumnoID,
        textoComentario: ComentarioAprobado.alumnoID,
        calsificacionComent: ComentarioAprobado.alumnoID,
    }
    ])

    try {
        var savedComentarioAAprobar = await oldComentarioAAprobar.save()
        var savedClase = await claseAComentar.save()
        return savedClase;
    } catch (e) {
        throw Error("And Error occured while updating the Clase");
    }


 }

exports.getComentariosAAprobar = async function (query) {
    try{ 
        var ComentariosAAprobar = await ComentarioAAprobar.paginate(query)
        return ComentariosAAprobar.comentarios
    }
    catch(e){
        console.log("error services", e)
        throw Error('Error while Paginating Clases');
    }
}
 


