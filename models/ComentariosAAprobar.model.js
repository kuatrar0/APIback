var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var ComentarioAAprobarSchema = new mongoose.Schema({

    claseID: String,
    alumnoID: String,
    nombreAlumnoID: String,
    comentario: String,
    clasificacion: Number,
    estado: String, //puede ser Pendiente, Aprobado o Rechazado
    razonDeRechazo: String
    
})

ComentarioAAprobarSchema.plugin(mongoosePaginate)
const ComentarioAAprobar = mongoose.model('ComentarioAAprobar', ComentarioAAprobarSchema)

module.exports = ComentarioAAprobar;