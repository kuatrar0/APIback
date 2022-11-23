var express = require('express')
var router = express.Router()
var ClaseController = require('../controllers/clases.controller');
var Authorization = require('../auth/authorization');





router.post('/creacionClase', ClaseController.createClase)
router.post('/getClasesPID', ClaseController.getClasesByidProfesor)
router.get('/getClases', ClaseController.getClases)
router.get('/getClasesActivas', ClaseController.getClasesActivas)
router.post('/getComentarios', ClaseController.getComentariosDeClase)
router.post('/getAlumnos', ClaseController.getAlumnos)
router.post('/bajaClase', ClaseController.bajaClase)
router.post('/eliminarClase', ClaseController.eliminarClase)
router.put('/modificarClase', ClaseController.modificarClase)
router.put('/modificarEstado', ClaseController.modificarEstado)

















