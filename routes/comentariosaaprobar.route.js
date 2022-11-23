var express = require('express')
var router = express.Router()
var ComentarioAAprobarController = require('../controllers/comentarioAAprobar.controller');
var Authorization = require('../auth/authorization');



router.post('/creacionComentarioAProbar', ComentarioAAprobarController.createComentario)
router.post('/aprobarComentario', ComentarioAAprobarController.aprobarComentario)
router.post('/rechazarComentario', ComentarioAAprobarController.rechazarComentario)
router.post('/getComentariosAAprobarPID', ComentarioAAprobarController.getComentariosAAprobarByidProfesor)


















