var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ComentarioSchema = new mongoose.Schema({
    ClaseID: String,
    AlumnoID: String,
    Comentario: String,
    Clasificacion: String,
    
})

ClaseSchema.plugin(mongoosePaginate)
const Comentario = mongoose.model('Comentario', ComentarioSchema)

module.exports = Clase;