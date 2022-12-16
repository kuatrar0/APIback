// Gettign the Newly created Mongoose Model we just created 

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const Clase = require('../models/Clase.model');

// Saving the context of this module inside the _the variable
_this = this

exports.createClase = async function (clase) {
    var newClase = new Clase({
        idProfesor: clase.idProfesor,
        profesor: clase.profesor,
        materia: clase.materia,
        duracion: clase.duracion,
        frecuencia: clase.frecuencia,
        costo: clase.costo,
        descripcion: clase.descripcion,
        tipo: clase.tipo,
        clasificacion: 0,
        estadoClase: "publica",
        eliminado: false,
        alumnos: [],
        comentarios: []
    })
    try {
        // Saving the User 
        var savedClase = await newClase.save();
        var token = jwt.sign({
            id: savedClase._id
        }, process.env.SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });
        return savedClase;
    } catch (e) {
        // return a Error message describing the reason 
        console.log(e)
        throw Error("Error while Creating Clase")
    }
}

exports.getComentarios = async function (query) {
    try {
        var Clases = await Clase.find(query)
        return Clases.comentarios
    }
    catch (e) {
        console.log("error services", e)
        throw Error('Error while Paginating Clases');
    }
}


//PEDIR AYUDA ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
exports.getAlumnosSer = async function (query, queryAlu) {
    try {
        var Clases = await Clase.paginate(query)
        console.log(Clases)
        if (Clases.alumnos == null) {
            throw Error("¡NO HAY ALUMNOS EN TU CLASE!")

        }
        else {
            var Alumnos = Clases.alumnos.paginate(queryAlu)
            console.log(Alumnos)
            return Clases
        }

    }
    catch (e) {
        console.log("error services", e)
        throw Error('Error while Paginating Clases');
    }
}

exports.modificarClaseSer = async function (clase) {
    var id = clase._id

    try {
        //Find the old User Object by the Id
        var oldClase = await Clase.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    // If no old User Object exists return false
    if (!oldClase) {
        return false;
    }
    //Edit the User Object
    oldClase.duracion = clase.duracion
    oldClase.frecuencia = clase.frecuencia
    oldClase.costo = clase.costo
    try {
        var savedClase = await oldClase.save()
        return savedClase;
    } catch (e) {
        throw Error("An Error occured while updating the Clase");
    }
}


/*
exports.eliminarClase = async function (id) {
    try {
        var deleted = await Clase.remove({
            _id: id
        })
        if (deleted.n === 0 && deleted.ok === 1) {
            throw Error("Clase Could not be deleted")
        }
        return deleted;
    } catch (e) {
        throw Error("Error Occured while Deleting the Clase")
    }
}
 VOY A HACERLO CON BAJA LOGICA
*/


exports.eliminarClaseSer = async function (clase) {
    var id = clase._id

    try {
        //Find the old User Object by the Id
        var oldClase = await Clase.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    // If no old User Object exists return false
    if (!oldClase) {
        return false;
    }
    //Edit the User Object
    oldClase.eliminado = true
    try {
        var savedClase = await oldClase.save()
        return savedClase;
    } catch (e) {
        throw Error("An Error occured while updating the Clase");
    }
}



exports.getClases = async function (query) {

    try {
        console.log("Query", query)
        var Clases = await Clase.paginate(query)
        // Return the Userd list that was retured by the mongoose promise
        return Clases;

    } catch (e) {
        // return a Error message describing the reason 
        console.log("error services", e)
        throw Error('Error while getting Clases');
    }
}

exports.modificarEstadoSer = async function (clase) {
    var id = clase._id

    try {
        //Find the old User Object by the Id
        var oldClase = await Clase.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    // If no old User Object exists return false
    if (!oldClase) {
        return false;
    }
    //Edit the User Object
    oldClase.estadoClase = clase.estadoClase
    try {
        var savedClase = await oldClase.save()
        return savedClase;
    } catch (e) {
        throw Error("And Error occured while updating the Clase");
    }
}

exports.getAlumnos = async function (query) {
    try {
        var Clase = await Clase.find(query)
        return Clase.alumnos
    }
    catch (e) {
        console.log("error services", e)
        throw Error('Error while Paginating Clases');
    }
}


exports.bajaClaseSer = async function (ClaseBajar, AlumnoBaja) {
    let idClase = ClaseBajar._id
    let idAlumno = AlumnoBaja._id
    console.log(AlumnoBaja)
    console.log(ClaseBajar)
    try {
        //Find the old User Object by the Id
        var claseBajarse = await Clase.findById(idClase);

    } catch (e) {
        throw Error("Error occured while Finding the Clase")
    }
    if (!claseBajarse) {
        return false;
    }
    try {
        //Find the old User Object by the Id
        var usuarioABajar = await User.findById(AlumnoBaja._id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }
    // If no old User Object exists return false
    if (!usuarioABajar) {
        return false;
    }
    try {
        let flag = false
        let cont = 0
        let ubicacion = 0
        usuarioABajar.clasesAnotado.forEach(function (clase) {
            if (clase.idclase == ClaseBajar._id) {
                flag = true
                ubicacion = cont
            }
            cont++
        })
        if (flag == true) {
            console.log(usuarioABajar.clasesAnotado[ubicacion] )
            usuarioABajar.clasesAnotado[ubicacion].estado = AlumnoBaja.estadoAlu
            console.log(usuarioABajar.clasesAnotado[ubicacion] )
        }
        flag = false
        cont = 0
        ubicacion = 0
        claseBajarse.alumnos.forEach(function (alumno) {
            if (alumno.idAlu == Alumno._id) {
                flag = true
                ubicacion = cont
            }
            cont++
        })
        if (flag == true) {
            claseBajarse.alumnos[ubicacion].baja = true
        }
        var savedClase= claseBajarse.save()
        var savedAlumno = usuarioABajar.save()
        return savedClase;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}
