var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var UserSchema = new mongoose.Schema({
    email: String,
    telefono: String,
    password: String,
    nombre: String,
    apellido: String,
    ciudad: String,
    rol: String,
    preguntaSeg: String,
    respuesta: String,
    fechaNac: Date,
    profesor: {
        titulo: String,
        exp: String
    },
    alumno: {
        ultimoAlcanzado: String,
        estadoEstudio: String
    }
})

UserSchema.plugin(mongoosePaginate)
const User = mongoose.model('User', UserSchema)

module.exports = User;