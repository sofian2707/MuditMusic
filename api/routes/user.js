'use strict'


/* Importaciones */
var express = require('express');
var UserController = require('../controllers/user');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//Multiparty permite enviar ficheros - 
var multipart = require('connect-multiparty')
var md_upload = multipart({ uploadDir: './uploads/users' });




/* The above code is creating a route for the user controller. */
// RUTAS DE USUARIO
api.get('/probando-controlador', md_auth.ensureAuth,  UserController.pruebas);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);
api.post('/upload-image-user/:id', [md_auth.ensureAuth, md_upload], UserController.uploadImage);
api.get('/get-image-user/:imageFile', UserController.getImageFile);

/* Exporting the api variable to be used in other files. */
module.exports = api;