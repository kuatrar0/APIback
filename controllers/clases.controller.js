var UserService = require('../services/clase.service');

exports.createClase = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller", req.body)
    var Clase = {
        idProfesor: req.body.idProfesor,
        profesor: req.body.profesor,
        materia: req.body.materia,
        duracion: req.body.duracion,
        frequencia: req.body.frequencia,
        costo: req.body.frequencia,
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdClase = await ClaseService.createClase(Clase)
        return res.status(201).json({ createdClase, message: "Succesfully Created User" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" })
    }
}

exports.getClasesByidProfesor = async function (req, res) {  // esta 

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = { idProfesror: req.body.idProfesor, eliminado: false }
    try {
        var Clases = await ClaseService.getClases(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Clases, message: "Succesfully Clases Recieved" });
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
        return res.status(200).json({ status: 200, data: Clases, message: "Succesfully Clases Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}



exports.getComentariosDeClase = async function (req, res) {  // esta 

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = { idClase: req.body.idClase }
    try {
        var Comentarios = await ClaseService.getComentarios(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Comentarios, message: "Succesfully Clases Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}



exports.getAlumnos = async function (req, res) {
    let filtro = { idClase: req.body.idClase, baja :  false}
    try {
        var Alumnos = await ClaseService.getAlumnos(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Alumnos, message: "Succesfully Clases Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }

}


//modificar clase, modif estado, baja clase, eliminar clase




exports.bajaClase = async function (req, res) { // esta 

    // Id is necessary for the update
    if (!req.body) {
        return res.status(400).json({status: 400., message: "no hay ids!!!!! ALGO MALO PASO"})
    }
    var ClaseBajar = {
       
        _id: req.body._idClase ? req.body._idClase : null,
    }
    var AlumnoBaja = {
       
        _id: req.body._idAlumno ? req.body._idAlumno : null,
    }
    try {
        var bajaClase = await ClaseService.bajaClase(ClaseBajar, AlumnoBaja)
        return res.status(200).json({status: 200, data: bajaClase, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}


exports.modificarClase = async function (req, res) { // esta 

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "no hay id!!!!! ALGO MALO PASO"})
    }
    var Clase = {
       
        _id: req.body._id ? req.body._id : null,
        duracion: req.body.duracion ? req.body.duracion : null,
        frecuencia: req.body.frecuencia ? req.body.frecuencia : null,
        costo: req.body.costo ? req.body.costo : null
        

    }
    try {
        var modificarClase = await ClaseService.modificarClase(Clase)
        return res.status(200).json({status: 200, data: modificarClase, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.modificarEstado = async function (req, res) { // esta 

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({status: 400., message: "no hay id!!!!! ALGO MALO PASO"})
    }
    var Clase = {
       
        _id: req.body._id ? req.body._id : null,
        estadoClase: req.body.estadoClase ? req.body.estadoClase : null,
    }
    try {
        var modificarEstado = await ClaseService.modificarEstado(Clase)
        return res.status(200).json({status: 200, data: modificarEstado, message: "Succesfully Updated User"})
    } catch (e) {
        return res.status(400).json({status: 400., message: e.message})
    }
}



/*
    perguntar a los chicos como hacer para traer las clases de un usuario
    si hacerlo en users o clases






exports.getClasesByidAlumno = async function (req, res) {  // esta 

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = { idAlumno: req.body.idAlumno }
    try {
        var Clases = await ClaseService.getClases(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Clases, message: "Succesfully Clases Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}*/

