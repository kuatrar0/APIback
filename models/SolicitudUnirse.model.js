var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')

var SolicitudUnirseSchema = new mongoose.Schema({

    claseID: String,
    alumnoID: String,
    solicitud: String,
    horario: String, 
    estado: String //puede ser Pendiente, Aprobado o Rechazado
    
})

SolicitudUnirseSchema.plugin(mongoosePaginate)
const SolicitudUnirse = mongoose.model('SolicitudUnirse', SolicitudUnirseSchema)

module.exports = SolicitudUnirse;