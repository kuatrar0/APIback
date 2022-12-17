// Gettign the Newly created Mongoose Model we just created 

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Clase = require('../models/Clase.model');
const ComentarioAAprobar = require('../models/ComentariosAAprobar.model');

// Saving the context of this module inside the _the variable
_this = this

exports.createComentarioAAprobar = async function (ComentarioSolicitud) {
    var nuevoComentatarioAAprobar = new ComentarioAAprobar({
        claseID: ComentarioSolicitud.claseID,
        profesorID: ComentarioSolicitud.profesorID,
        alumnoID: ComentarioSolicitud.alumnoID,
        nombreAlumno: ComentarioSolicitud.nombreAlumno,
        comentario: ComentarioSolicitud.comentario,
        clasificacion: ComentarioSolicitud.clasificacion,
        estado: "pendiente", //puede ser Pendiente, Aprobado o Rechazado
        razonDeRechazo: null
    })
    try {
        // Saving the User 
        var savedComentarioAAprobar = await nuevoComentatarioAAprobar.save();
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
    try {
        var savedClase = await oldClase.save()
        return savedClase;
    } catch (e) {
        throw Error("And Error occured while updating the Clase");
    }

}
exports.aprobarComentario = async function (ComentarioAprobado) {
    var idComentario = ComentarioAprobado._id

    try {
        //Find the old User Object by the Id
        var oldComentarioAAprobar = await ComentarioAAprobar.findById(idComentario);
        console.log(oldComentarioAAprobar)
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
        console.log(claseAComentar)
    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    // If no old User Object exists return false
    if (!claseAComentar || claseAComentar.eliminado == true) {
        throw Error("La clase que buscas no existe")
    }
    let flag = false
    let cont = 0
    let ubicacion = 0
    claseAComentar.comentarios.forEach(function (coment) {
        if (coment.idAlu == ComentarioAprobado.idAlu) {
            flag = true
            ubicacion = cont
        }
        cont++
    })
    if (flag == true) {
        claseAComentar.comentarios[ubicacion].textoComentario = ComentarioAprobado.textoComentario
        claseAComentar.comentarios[ubicacion].clasificacionComent = ComentarioAprobado.clasificacionComent
        try {
            var savedComentarioAAprobar = await oldComentarioAAprobar.save()
            //hacer calculols de claisificacion primedio aca y abajo en el otro try
            let suma = 0
            claseAComentar.comentarios.forEach((x) => { suma += x.clasificacionComent })
            if (cont == 0) {
                claseAComentar.clasificacion = suma / 1
            }
            else {
                claseAComentar.clasificacion = suma / cont
            }
            var savedClase = await claseAComentar.save()
            return savedClase
        }
        catch (e) {
            throw Error("And Error occured while updating the Clase");
        }
    }
    else {
        console.log(ComentarioAprobado)
        claseAComentar.comentarios = claseAComentar.comentarios.concat([{
            idAlu: ComentarioAprobado.idAlu,
            nombreAlu: ComentarioAprobado.nombreAlu,
            textoComentario: ComentarioAprobado.textoComentario,
            clasificacionComent: ComentarioAprobado.clasificacionComent
        }])
    }
    try {
        let suma = 0

        claseAComentar.comentarios.forEach((x) => { suma += x.clasificacionComent })
       
        if (claseAComentar.comentarios.length == 0) {
            claseAComentar.clasificacion = suma / 1
        }
        else {
            claseAComentar.clasificacion = suma / claseAComentar.comentarios.length
        }
       
        var savedComentarioAAprobar = await oldComentarioAAprobar.save()
        var savedClase = await claseAComentar.save()
        return savedClase;
    } catch (e) {
        throw Error(e);
    }


}

exports.getComentariosAAprobar = async function (query) {
    try {
        var ComentariosAAprobar = await ComentarioAAprobar.find(query)

        return ComentariosAAprobar
    }
    catch (e) {
        console.log("error services", e)

    }
}



