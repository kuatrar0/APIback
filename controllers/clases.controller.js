var ClaseService = require('../services/clase.service');

exports.createClase = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller", req.body)
    var Clase = {
        idProfesor: req.body.idProfesor,
        profesor: req.body.profesor,
        materia: req.body.materia,
        duracion: req.body.duracion,
        frecuencia: req.body.frecuencia,
        costo: req.body.costo,
        descripcion: req.body.descripcion,
        tipo: req.body.tipo
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdClase = await ClaseService.createClase(Clase)
        return res.status(201).json({ createdClase, message: "Succesfully Created clase " })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "clase Creation was Unsuccesfull" })
    }
}

exports.getClasesByidProfesor = async function (req, res) {  // esta
    console.log(req.body)
    // Check the existence of the query parameters, If doesn't exists assign a default value
    let filtro = { idProfesor: req.body.idProfesor, eliminado: false }
    try {
        var Clases = await ClaseService.getClases(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Clases, message: "Succesfully Clases por id prof Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}

exports.getClases = async function (req, res) {  // esta 
    // Check the existence of the query parameters, If doesn't exists assign a default value
    try {
        var Clases = await ClaseService.getClases({})
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Clases, message: "Succesfully Clases Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}

exports.getClasesActivas = async function (req, res) {  // esta 
    // Check the existence of the query parameters, If doesn't exists assign a default value
    let filtro = { eliminado: false, estadoClase: "publica" }
    try {
        var Clases = await ClaseService.getClases(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Clases, message: "Succesfully Clases Activas Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}

////////////////////// HACER GET CLASES DE ALUMNO PREFUNTARLE A LOS CHICOS

exports.getComentariosDeClase = async function (req, res) {  // esta 

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let filtro = req.body.idClase 
    try {
        var Comentarios = await ClaseService.getComentarios(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Comentarios, message: "Succesfully comentarios Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}


// devuelve error si no existen alumnos
exports.getAlumnosCursando = async function (req, res) {
    let filtro = { _id: req.body._id }
    try {
        var Alumnos = await ClaseService.getAlumnosSer(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Alumnos, message: "Succesfully alumnos Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}

// PREGUNTAR COMO HACER esTA A TOMI
exports.bajaClase = async function (req, res) { // esta 
    if (!req.body) {
        return res.status(400).json({ status: 400., message: "no hay ids!!!!! ALGO MALO PASO" })
    }
    var ClaseBajar = {

        _id: req.body._idClase ? req.body._idClase : null,
    }
    var AlumnoBaja = {
        estadoAlu: req.body.estado ? req.body.estado : null,
        _id: req.body._idAlumno ? req.body._idAlumno : null
    }
    try {
        var bajaClase = await ClaseService.bajaClaseSer(ClaseBajar, AlumnoBaja)
        return res.status(200).json({ status: 200, data: bajaClase, message: "Succesfully baja clase" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}



exports.eliminarClase = async function (req, res) { // esta 
    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "no hay id!!!!! ALGO MALO PASO" })
    }
    var Clase = {
        _id: req.body._id ? req.body._id : null,
    }
    try {
        var eliminada = await ClaseService.eliminarClaseSer(Clase)
        return res.status(200).json({ status: 200, data: eliminada, message: "Succesfully Clase Deleted" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}


exports.modificarClase = async function (req, res) { // esta 
    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "no hay id!!!!! ALGO MALO PASO" })
    }
    var Clase = {

        _id: req.body._id ? req.body._id : null,
        duracion: req.body.duracion ? req.body.duracion : null,
        frecuencia: req.body.frecuencia ? req.body.frecuencia : null,
        costo: req.body.costo ? req.body.costo : null


    }
    try {
        var modificarClase = await ClaseService.modificarClaseSer(Clase)
        return res.status(200).json({ status: 200, data: modificarClase, message: "Succesfully Updated clase" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.modificarEstado = async function (req, res) { // esta 
    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "no hay id!!!!! ALGO MALO PASO" })
    }
    var Clase = {

        _id: req.body._id ? req.body._id : null,
        estadoClase: req.body.estadoClase ? req.body.estadoClase : null,
    }
    try {
        var modificarEstado = await ClaseService.modificarEstadoSer(Clase)
        return res.status(200).json({ status: 200, data: modificarEstado, message: "Succesfully Updated estado de la clase" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.filtroClases = async function (req, res) {  // esta 
    // Check the existence of the query parameters, If doesn't exists assign a default value
    var filtroFinal ={}
    if(req.body.materia){
        filtroFinal["materia"] = req.body.materia
    }
    
    if(req.body.tipo){
        filtroFinal["tipo"] = req.body.tipo
    }
    if(req.body.frecuencia){
        filtroFinal["frecuencia"] = req.body.frecuencia
    }
    if(req.body.precioMin && req.body.precioMax){
        filtroFinal["costo"] = {"$lte": req.body.precioMax, "$gte": req.body.precioMin}
    }

    if(req.body.clasificacionMin && req.body.clasificacionMax){
        filtroFinal["clasificacion"] = {"$lte": req.body.clasificacionMax, "$gte": req.body.clasificacionMin}
    }
    
    console.log(filtroFinal)


    try {
        var Clases = await ClaseService.getClases(filtroFinal)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Clases, message: "Succesfully Clases Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}