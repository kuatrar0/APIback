var SolicitudUnirseService = require('../services/solicitudUnirse.service');


exports.createSolicitud = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller", req.body)
    var Solicitud = {
        claseID: req.body.claseID,
        alumnoID: req.body.alumnoID,
        solicitud: req.body.solicitud,
        horario: req.body.horario,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdSolicitud = await SolicitudUnirseService.createSolicitudUnirse(Solicitud)
        return res.status(201).json({ createdSolicitud, message: "Succesfully Created Solicitud" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "Solicitud Creation was Unsuccesfull" })
    }
}

exports.aceptarSolicitud = async function (req, res) { // esta 
    // Id is necessary for the update
    if (!req.body) {
        return res.status(400).json({status: 400., message: "Error"})
    }
    var solicitud = {
       
        _id: req.body._id ? req.body._id : null,
    }
   
    try {
        var solicitudAceptada = await SolicitudUnirseService.aceptarSolicitud(solicitud)
        return res.status(200).json({status: 200, data: solicitudAceptada, message: "Succesfully Accepted Solicitud"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}


exports.rechazarSolicitud = async function (req, res) { // esta 
    // Id is necessary for the update
    if (!req.body) {
        return res.status(400).json({status: 400., message: "Error"})
    }
    var solicitud = {
       
        _id: req.body._id ? req.body._id : null,
    }
   
    try {
        var solicitudRechazada = await SolicitudUnirseService.rechazarSolicitud(solicitud)
        return res.status(200).json({status: 200, data: solicitudRechazada, message: "Succesfully Refused Solicitud"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}


exports.getSolicitudesByClaseID = async function (req, res) {  // esta 
    // Check the existence of the query parameters, If doesn't exists assign a default value
    let filtro = { idClase: req.body.idClase}
    try {
        var Solicitudes = await SolicitudUnirseService.getSolicitudes(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Solicitudes, message: "Succesfully Solicitudes Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}
