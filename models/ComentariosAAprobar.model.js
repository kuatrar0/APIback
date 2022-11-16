var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ComentarioAAprobarSchema = new mongoose.Schema({
    ClaseID: String,
    AlumnoID: String,
    Comentario: String,
    Clasificacion: Number,
    
})

ComentarioAAprobarSchema.plugin(mongoosePaginate)
const ComentarioAAprobar = mongoose.model('Comentario', ComentarioAAprobarSchema)

module.exports = ComentarioAAprobar;