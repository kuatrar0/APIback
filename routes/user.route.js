var express = require('express')
var router = express.Router()
var UserController = require('../controllers/users.controller');
var UploadController = require('../controllers/upload.controller');
var Authorization = require('../auth/authorization');


// Authorize each API with middleware and map to the Controller Functions
/* GET users listing. */
router.get('/test', function(req, res) {
    res.send('Llegaste a la ruta de users');
  });
router.post('/registration', UserController.createUser)
router.post('/login/', UserController.loginUse)
/*
router.get('/',Authorization, UserController.getUsers)
router.post('/userByMail', Authorization, UserController.getUsersByMail)
router.put('/', Authorization, UserController.updateUser)
router.delete('/:id', Authorization, UserController.removeUser)
router.post('/guardarImgUser',UserController.guardarImagenUser)
router.post('/uploadImg',UploadController.uploadFilesImgUser);
router.post('/imgUserByMail',Authorization,UserController.getImagenUserByMail)
router.post('/sendMail',MailController.sendEmail)


*/
// Export the Router
module.exports = router;



