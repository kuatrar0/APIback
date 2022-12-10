// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/User.model');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Clase = require('../models/Clase.model');
const SolicitudUnirse = require('../models/SolicitudUnirse.model');

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query) {

    // Options setup for the mongoose paginate
    // Try Catch the awaited promise to handle the error 
    try {
        console.log("Query", query)
        var Users = await User.find(query)
        // Return the Userd list that was retured by the mongoose promise
        return Users;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while Paginating Users');
    }
}

exports.createUser = async function (user) {
    // Creating a new Mongoose Object by using the new keyword
    var hashedPassword = bcrypt.hashSync(user.password, 8);
    console.log(user)
    if (user.esProfesor === true) {
        console.log("llegue a profesor")
        var newUser = new User({
            email: user.email,
            password: hashedPassword,
            nombre: user.nombre,
            apellido: user.apellido,
            telefono: user.telefono,
            ciudad: user.ciudad,
            preguntaSeg: user.preguntaSeg,
            respuesta: user.respuesta.toLowerCase(),
            fechaNac: user.fechaNac,
            titulo: user.titulo,
            exp: user.exp,
            esProfesor: user.esProfesor

        })
    }
    else {
        console.log("llegue a alumno")
        var newUser = new User({
            
            email: user.email,
            password: hashedPassword,
            nombre: user.nombre,
            apellido: user.apellido,
            telefono: user.telefono,
            ciudad: user.ciudad,
            preguntaSeg: user.preguntaSeg,
            respuesta: user.respuesta.toLowerCase(),
            fechaNac: user.fechaNac,
            ultimoAlcanzado: user.ultimoAlcanzado,
            estadoEstudio: user.estadoEstudio,
            clasesAnotado: [],
            esProfesor: user.esProfesor,
            ultimoAlcanzado: user.ultimoAlcanzado,
            estadoEstudio: user.estadoEstudio
        })
    }

    try {
        // Saving the User 
        var savedUser = await newUser.save();
        var token = jwt.sign({
            id: savedUser._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return token;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {

    var id = user._id 

    try {
        //Find the old User Object by the Id
        var oldUser = await User.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    //Edit the User Object
    oldUser.telefono = user.telefono
    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.updateUserPass = async function (user, respuesta) {
    var id = { _id: user._id }
    try {
        //Find the old User Object by the Id
        var oldUser = await User.findOne(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }
    
    if (respuesta.respuesta.toLowerCase() == oldUser.respuesta) {

        //Edit the User Object
        var hashedPassword = bcrypt.hashSync(user.password, 8);
        oldUser.password = hashedPassword
        try {
            var savedUser = await oldUser.save()
            return savedUser;
        } catch (e) {
            throw Error("And Error occured while updating the User");
        }
    }
    else {
        throw Error("Respuesta incorrecta")
    }
}


/*
exports.getPreguntaSeg = async function (email) {
    var busqueda = await User.findOne({
        email: email
    });
    return busqueda.preguntaSeg

}
*/


exports.deleteUser = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("User Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}


exports.loginUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    try {
        // Find the User 
        console.log("login:", user)
        var _details = await User.findOne({
            email: user.email
        });
        var passwordIsValid = bcrypt.compareSync(user.password, _details.password);
        if (!passwordIsValid) return 0;

        var token = jwt.sign({
            id: _details._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return { token: token, user: _details };
    } catch (e) {
        // return a Error message describing the reason     
        throw Error("Error while Login User")
}


}