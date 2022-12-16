var ComentarioAAprobarService = require('../services/comentarioAAprobar.service');


exports.createComentario = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller", req.body)
    var Solicitud = {
        claseID: req.body.claseID,
        profesorID: req.body.profesorID,
        alumnoID: req.body.alumnoID,
        nombreAlumno: req.body.nombreAlumno,
        comentario: req.body.comentario,
        clasificacion: req.body.clasificacion,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdSolicitud = await ComentarioAAprobarService.createComentarioAAprobar(Solicitud)
        return res.status(201).json({ createdSolicitud, message: "Succesfully Created Solicitud" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "Solicitud Creation was Unsuccesfull" })
    }
}



exports.rechazarComentario = async function (req, res) { // esta 
    // Id is necessary for the update
    if (!req.body) {
        return res.status(400).json({status: 400., message: "no hay ids!!!!! ALGO MALO PASO"})
    }
    var ComentarioRechazado = {
       
        _id: req.body._id ? req.body._id : null,
        razonDeRechazo: req.body.razonDeRechazo ? req.body.razonDeRechazo : null,
    }
   
    try {
        var comentarioRechazado = await ComentarioAAprobarService.rechazarComentario(ComentarioRechazado)
        return res.status(200).json({status: 200, data: comentarioRechazado, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }

}


exports.aprobarComentario = async function (req, res) { // esta 
    // Id is necessary for the update
    if (!req.body) {
        return res.status(400).json({status: 400., message: "no hay ids!!!!! ALGO MALO PASO"})
    }
    var ComentarioAprobado = {
        _id: req.body._id ? req.body._id : null,
        claseID: req.body.claseID ? req.body.claseID : null,
        idAlu: req.body.idAlu ? req.body.idAlu : null,
        nombreAlu: req.body.nombreAlu ? req.body.nombreAlu : null,
        textoComentario: req.body.textoComentario ? req.body.textoComentario : null,
        clasificacionComent: req.body.clasificacionComent ? req.body.clasificacionComent : null
    }
   
    try {
        var comentarioAprobado = await ComentarioAAprobarService.aprobarComentario(ComentarioAprobado)
        return res.status(200).json({status: 200, data: comentarioAprobado, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }

}



exports.getComentariosAAprobarByidProfesor = async function (req, res) {  // esta 
    // Check the existence of the query parameters, If doesn't exists assign a default value
    let filtro = { profesorID: req.body.profesorID}
    try {
        var ComentariosPendientes = await ComentarioAAprobarService.getComentariosAAprobar(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: ComentariosPendientes, message: "Succesfully Clases Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}
