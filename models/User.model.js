var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    email:{ type:String, required: true},
    telefono:{ type:String, required: true},
    password:{ type:String, required: true},
    nombre:{ type:String, required: true},
    ciudad:{ type:String, required: true},
    preguntaSeg:{ type:String, required: true},
    respuesta:{ type:String, required: true},
    fechaNac:{ type:String, required: true},
    esProfesor: { type:Boolean, required: true},
        titulo: String,
        exp: String,
        ultimoAlcanzado: String,
        estadoEstudio: String,
    clasesAnotado:[{
        idclase : String,
        idProfesor: String,
        estado: String ,// puede ser cancelado, cursando o terminado
        profesor: String,
        materia: String,
        clasificacionDada: Number
    }],
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;