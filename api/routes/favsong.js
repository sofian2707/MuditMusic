'use strict'


/* Importaciones */
var express = require('express');
var FavSongController = require('../controllers/favsong');

var api = express.Router();
var md_auth = require('../middlewares/authenticated');

//Multiparty permite enviar ficheros - 
var multipart = require('connect-multiparty')
var md_upload = multipart({ uploadDir: './uploads/users' });




api.get('/probando', md_auth.ensureAuth, FavSongController.probando);

// Ruta para guardar una canción favorita
api.post('/favorite/:id', md_auth.ensureAuth, FavSongController.saveFavoriteSong);

// Ruta para obtener las canciones favoritas de un usuario
api.get('/favorite-songs', md_auth.ensureAuth, FavSongController.getFavoriteSongs);

// Ruta para eliminar una canción favorita
api.delete('/favorite/:id', md_auth.ensureAuth, FavSongController.deleteFavoriteSong);


module.exports = api;

