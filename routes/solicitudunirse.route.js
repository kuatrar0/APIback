var express = require('express')
var router = express.Router()
var SolicitudUnirseController = require('../controllers/solicitudUnirse.controller');
var Authorization = require('../auth/authorization');





router.post('/creacionSolicitud', SolicitudUnirseController.createSolicitud)
router.post('/aceptarSolicitud',SolicitudUnirseController.aceptarSolicitud)
router.post('/rechazarSolicitud',SolicitudUnirseController.rechazarSolicitud)
router.post('/getSolicitud',SolicitudUnirseController.getSolicitudesByClaseID)














