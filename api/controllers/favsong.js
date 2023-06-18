'use strict'


/* Importaciones */

//Permiten trabajar con los sistema de ficheros
var fs = require('fs');  
var path = require('path'); 

var FavSong = require('../models/favsong');
var Song = require('../models/song');
var User = require('../models/user');

var bcrypt = require('bcrypt-nodejs');
const { hash } = require('bcryptjs');
var jwt = require('../services/jwt');



//Agregar cancion favorita

function probando(req, res){
    var songId = req.params.id;
    var userId = req.user.sub; // Obtener el ID del usuario autenticado
    console.log(req.headers.authorization); // Verificar el valor del token
    res.status(200).send({message: 'Probando una accion del controlador de favsong'});

    }

//guardar canciones favoritas  
    function saveFavoriteSong(req, res) {
        var songId = req.params.id;
        var userId = req.user.sub; // Obtener el ID del usuario autenticado
    
        var favSong = new FavSong();
        favSong.user = userId;
        favSong.song = songId;
    
        favSong.save((err, favSongStored) => {
            if (err) {
                res.status(500).send({ message: 'Error en el servidor' });
            } else {
                console.log('La canción se ha agregado a favoritos'); // Mensaje en consola
                res.status(200).send({ favSong: favSongStored });
            }
        });
    }


    // Obtener canciones favoritas con detalles
function getFavoriteSongs(req, res) {
    var userId = req.user.sub; // Obtener el ID del usuario autenticado
  
    FavSong.find({ user: userId })
      .populate('song')
      .exec((err, favoriteSongs) => {
        if (err) {
          res.status(500).send({ message: 'Error en el servidor' });
        } else {
          res.status(200).send({ favoriteSongs });
        }
      });
  }
    
 

    
    


module.exports = {
    probando,
    saveFavoriteSong,
    getFavoriteSongs
  
};