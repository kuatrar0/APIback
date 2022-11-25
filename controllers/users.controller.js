var UserService = require('../services/user.service');
var UserImgService = require('../services/userImg.service');

// Saving the context of this module inside the _the variable
_this = this;

// Async Controller function to get the To do List





exports.getUsers = async function (req, res) {  // esta pero ver tema paginate

    // Check the existence of the query parameters, If doesn't exists assign a default value

    try {
        var Users = await UserService.getUsers({})
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}
exports.getUsersByID = async function (req, res) { // esta 

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = { _id: req.body._id }
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: e.message });
    }
}

/** 
exports.getUsersByClaseID = async function (req, res) { // esta 

    // Check the existence of the query parameters, If doesn't exists assign a default value
    let filtro= {_id: req.body.claseID}
    try {
        var Users = await UserService.getUsers(filtro)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({status: 200, data: Users, message: "Succesfully Users Recieved"});
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({status: 400, message: e.message});
    }
}

*/



exports.getUsersByMail = async function (req, res) {  // esta 

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    let filtro = { email: req.body.email }
    try {
        var Users = await UserService.getUsers(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        return res.status(200).json({ status: 200, data: Users, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(404).json({ status: 404, message: e.message });
    }
}


exports.createUser = async function (req, res) {  // NOOOO esta 
    // Req.Body contains the form submit values.
    console.log(req.body)
    console.log("llegue al controller", req.body)
    if (req.body.esProfesor) {
        var User = {
            email: req.body.email,
            password: req.body.password,
            nombre: req.body.nombre,
            telefono: req.body.telefono,
            ciudad: req.body.ciudad,
            preguntaSeg: req.body.preguntaSeg,
            respuesta: req.body.respuesta,
            fechaNac: req.body.fechaNac,
            esProfesor: req.body.esProfesor,
            titulo: req.body.titulo,
            exp: req.body.exp
        }
    }
    else {
        var User = {
            email: req.body.email,
            password: req.body.password,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            ciudad: req.body.ciudad,
            preguntaSeg: req.body.preguntaSeg,
            respuesta: req.body.respuesta,
            fechaNac: req.body.fechaNac,
            esProfesor: req.body.esProfesor,
            ultimoAlcanzado: req.body.ultimoAlcanzado,
            estadoEstudio: req.body.estadoEstudio
        }
    }

    try {
        // Calling the Service function with the new object from the Request Body
        var createdUser = await UserService.createUser(User)
        return res.status(201).json({ createdUser, message: "Succesfully Created User" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: "User Creation was Unsuccesfull" })
    }
}

exports.updateUser = async function (req, res) { // esta 

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "no hay id!!!!! ALGO MALO PASO" })
    }
    var User = {

        _id: req.body._id ? req.body._id : null,
        telefono: req.body.telefono ? req.body.telefono : null

    }
    try {
        var updatedUser = await UserService.updateUser(User)
        return res.status(200).json({ status: 200, data: updatedUser, message: "Succesfully Updated User" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}


exports.updateUserPassword = async function (req, res) { // ESTA

    // Id is necessary for the update
    if (!req.body._id) {
        return res.status(400).json({ status: 400., message: "no hay id!!!!! aaaa llegueeee acaaa wowowoowwo" })
    }
    var User = {
        _id: req.body._id ? req.body._id : null,
        password: req.body.password ? req.body.password : null
    }

    var Respuesta = {
        respuesta: req.body.respuesta ? req.body.respuesta : null,
    }

    try {
        var updatedUser = await UserService.updateUserPass(User, Respuesta)
        return res.status(200).json({ status: 200, data: updatedUser, message: "Succesfully Updated User Password" })
    } catch (e) {
        return res.status(400).json({ status: 400., message: e.message })
    }
}



exports.removeUser = async function (req, res, next) { // ESTA

    var id = req.params.id;
    try {
        var deleted = await UserService.deleteUser(id);
        res.status(200).send("Succesfully Deleted... ");
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message })
    }
}


exports.loginUser = async function (req, res) { //PREGUNTAR TEMA PROFESOR O ALUMNO COMO HACER
    // Req.Body contains the form submit values.
    console.log("body", req.body)
    var User = {
        email: req.body.email,
        password: req.body.password
    }
    try {
        // Calling the Service function with the new object from the Request Body
        var loginUser = await UserService.loginUser(User);
        if (loginUser === 0)
            return res.status(400).json({ message: "Error en la contraseña" })
        else
            return res.status(201).json({ loginUser, message: "Succesfully login" })
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        return res.status(400).json({ status: 400, message: "Invalid username or password" })
    }
}

exports.guardarImagenUser = async function (req, res) {

    console.log("ImgUser", req.body)
    // Id is necessary for the update
    if (!req.body.email) {
        return res.status(400).json({ status: 400., message: "Mail must be present" })
    }

    let userImg = {
        email: req.body.email,
        nombreImagen: req.body.nombreImagen
    }

    try {
        if (userImg.nombreImagen !== '') {
            var newUserImg = await UserImgService.createUserImg(userImg);
        }

        return res.status(201).json({ status: 201, message: "Imagen cargada" });

    } catch (e) {
        console.log("error guardar imagen", e)
        return res.status(400).json({ status: 400., message: e.message })
    }
}

exports.getImagenUserByMail = async function (req, res) {

    // Check the existence of the query parameters, If doesn't exists assign a default value
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10;
    //obtener filtro
    var filtro = {
        mail: req.body.email
    }
    try {
        var UsersImg = await UserImgService.getImagenesByUser(filtro, page, limit)
        // Return the Users list with the appropriate HTTP password Code and Message.
        console.log("userByDni", UsersImg)
        if (UsersImg.total === 0)
            return res.status(201).json({ status: 201, data: UsersImg, message: "No existe Mail" });
        else
            return res.status(200).json({ status: 200, data: UsersImg, message: "Succesfully Users Recieved" });
    } catch (e) {
        //Return an Error Response Message with Code and the Error Message.
        console.log(e)
        return res.status(400).json({ status: 400, message: e.message });
    }
}


