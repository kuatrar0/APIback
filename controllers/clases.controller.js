var UserService = require('../services/clase.service');

exports.createUser = async function (req, res) {
    // Req.Body contains the form submit values.
    console.log("llegue al controller",req.body)
    var Clase = {
        profesor: req.body.profesor,
        materia: req.body.materia,
        duracion: req.body.duracion,
        frequencia: req.body.frequencia,
        costo: req.body.frequencia,
        clasificacion: req.body.clasificacion,
        comentario:{
            nombre: req.body.comentario.nombre,
            fechaPubli: req.body.comentario.fechaPubli,
            comentario: req.body.comentario.comentarioTexto
        },
        alumnos:{
            nombres: req.body.alumnos.participantes

        },
        estadoClase: req.body.estadoClase
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var createdClase = await ClaseService.createClase(Clase)
        return res.status(201).json({createdClase, message: "Succesfully Created User"})
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}