var express = require('express')
var router = express.Router()
var SolicitudUnirseController = require('../controllers/solicitudUnirse.controller');
var Authorization = require('../auth/authorization');


/**
 * @swagger
 * components:
 *  schemas:
 *      Solicitud Unirse:
 *          type: object
 *          properties:
 *              claseID: 
 *                  type: string
 *                  description: ID de la clase que se comentara 
 *              alumnoID:
 *                  type: string
 *                  description: ID del alumno que quiere comentar la clase
 *              solicitud: 
 *                  type: string
 *                  description: Mensaje que enviara el alumno para unirse
 *              horario:
 *                  type: string
 *                  description: horario en el que el alumno desea tener la clase
 *              estado:
 *                  type: string
 *                  description: estado en el que estara la solicitud. Puede ser Pendiente, Apronado o Rechazado
 *              
 *                   
 *          example:
 *            claseID: 124578
 *            alumnoID: 987654321
 *            solicitud: me quiero unir a su clase por favor
 *            horario: 13
 *            estado: pendiente
 *           
 *                                  
 */                                           
                                               
                     

 /**
 * @swagger
 * /solicitudunirse/creacionSolicitud:
 *  post:
 *      summary: crea una solicitud que luego tendra que ser aprobada por un profeosr para poder unirse a la clase
 *      tags: [Solicitud Unirse]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          claseID:
 *                              type: string
 *                              description: ID de la clase que se comentara
 *                          alumnoID:
 *                              type: string
 *                              description: ID del alumno que quiere comentar la clase
 *                          solicitud: 
 *                              type: string
 *                              description: Mensaje que enviara el alumno para unirse
 *                          horario:
 *                              type: string
 *                              description: horario en el que el alumno desea tener la clase
 *      responses:
 *          201:
 *              description: Succesfully Created Solicitud
 * 
 */

router.post('/creacionSolicitud', SolicitudUnirseController.createSolicitud)



/**
 * @swagger
 * /solicitudunirse/aceptarSolicitud:
 *  post:
 *      summary: crea una solicitud que luego tendra que ser aprobada por un profeosr para poder unirse a la clase
 *      tags: [Solicitud Unirse]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              description: ID de la solicitud aceptada
 *                          
 *      responses:
 *          201:
 *              description: Succesfully Accepted Solicitud
 * 
 */
router.post('/aceptarSolicitud',SolicitudUnirseController.aceptarSolicitud)

/**
 * @swagger
 * /solicitudunirse/aceptarSolicitud:
 *  post:
 *      summary: crea una solicitud que luego tendra que ser aprobada por un profeosr para poder unirse a la clase
 *      tags: [Solicitud Unirse]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          _id:
 *                              type: string
 *                              description: ID de la solicitud rechazada
 *                          
 *      responses:
 *          201:
 *              description: Succesfully Refused Solicitud
 * 
 */
router.post('/rechazarSolicitud',SolicitudUnirseController.rechazarSolicitud)

/**
 * @swagger
 * /solicitudunirse/getSolicitudesPID:
 *  post:
 *      summary: Trae todas las solicitudes que tiene una clase.
 *      tags: [Solicitud Unirse]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          idClase:
 *                              type: string
 *                              description: ID de la clase de la que se quieren ver las solicitudes
 *                          
 *      responses:
 *          201:
 *              description: Succesfully Solicitudes Recieved
 * 
 */
router.post('/getSolicitudesPID',SolicitudUnirseController.getSolicitudesByClaseID)


module.exports = router;











