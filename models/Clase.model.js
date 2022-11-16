var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ClaseSchema = new mongoose.Schema({
    profesor: String,
    materia: String,
    duracion: Number,
    frequencia: String,
    costo: Number,
    clasificacion: Number,
    estadoClase: String //publica - oculta

})

ClaseSchema.plugin(mongoosePaginate)
const Clase = mongoose.model('Clase', ClaseSchema)

module.exports = Clase;
