var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ComentarioSchema = new mongoose.Schema({
    ClaseID: String,
    AlumnoID: String,
    Comentario: String,
    Clasificacion: Number,
})

ComentarioSchema.plugin(mongoosePaginate)
const Comentario = mongoose.model('Comentario', ComentarioSchema)

module.exports = Comentario;