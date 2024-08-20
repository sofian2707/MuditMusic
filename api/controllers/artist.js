'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');



//Obtener artista
function getArtist(req, res){
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!artist){
                res.status(404).send({message: 'El artista no existe'});
            }else{
                res.status(200).send({artist});
            }
        }
    });
}

//Guardar artista
function saveArtist(req, res){
    var artist = new Artist();
    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el artista'});
        }else{
            if(!artistStored){
                res.status(404).send({message: 'El artista no ha sido guardado'});
            }else{
                res.status(200).send({artist: artistStored});
            }
        }
    });
}


function getArtists(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }
    var itemsPerPage = 4;
    Artist.find().sort('name').paginate(page, itemsPerPage, function(err, artists, total){
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!artists){
                res.status(404).send({message: 'No hay artistas!'});
            }else{
                return res.status(200).send({
                    total_items: total,
                    artists: artists
                });
            }
        }
     });
}


//Actualizar artista
function updateArtist(req, res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if(err){
            res.status(500).send({message: 'Error al guardar el artista'});
        }else{
            if(!artistUpdated){
                res.status(404).send({message: 'El artista no ha sido actualizado'});
            }else{
                res.status(200).send({artist: artistUpdated});
            }
        }

    });
}

function deleteArtist(req, res) {
    var artistId = req.params.id;

    // Primero, eliminamos al artista
    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if (err) {
            return res.status(500).send({message: 'Error al eliminar el artista'});
        }
        if (!artistRemoved) {
            return res.status(404).send({message: 'El artista no ha sido eliminado'});
        }

        // Luego, eliminamos los álbumes del artista eliminado
        Album.find({ artist: artistRemoved._id }, (err, albums) => {
            if (err) {
                return res.status(500).send({message: 'Error al buscar álbumes'});
            }

            // Si hay álbumes, eliminamos las canciones asociadas
            if (albums.length > 0) {
                Song.deleteMany({ album: { $in: albums.map(album => album._id) } }, (err) => {
                    if (err) {
                        return res.status(500).send({message: 'Error al eliminar las canciones'});
                    }

                    // Luego, eliminamos los álbumes
                    Album.deleteMany({ artist: artistRemoved._id }, (err) => {
                        if (err) {
                            return res.status(500).send({message: 'Error al eliminar los álbumes'});
                        }

                        // Finalmente, respondemos con el artista eliminado
                        res.status(200).send({artist: artistRemoved});
                    });
                });
            } else {
                // Si no hay álbumes, eliminamos directamente los álbumes
                Album.deleteMany({ artist: artistRemoved._id }, (err) => {
                    if (err) {
                        return res.status(500).send({message: 'Error al eliminar los álbumes'});
                    }

                    // Finalmente, respondemos con el artista eliminado
                    res.status(200).send({artist: artistRemoved});
                });
            }
        });
    });
}

function uploadImage(req, res){
    var artistId = req.params.id;
    var file_name = 'No subido..';
    if(req.files){
        var file_path = req.files.image.path;
       /* Dividir la ruta del archivo en una matriz y luego obtener el tercer elemento de la matriz. */
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        /* Dividir el nombre del archivo en una matriz y 
        luego obtener el segundo elemento de la matriz, obtiene la extension del archivo */
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            Artist.findByIdAndUpdate(artistId, {image: file_name}, (err, artistUpdated) =>{
                if(!artistUpdated){
                    res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                }else{
                    res.status(200).send({artist: artistUpdated});
                }
            });
        }else{
            res.status(200).send({message: 'Extension del archivo no valida'});
        }
    }else{
        res.status(200).send({message: 'No has subido ninguna imagen'});
    }
}


function getImageFile(req, res){
    //recuperar parametro que llega por url
    var imageFile = req.params.imageFile;
    var path_file = './uploads/artists/'+imageFile;

    if(fs.existsSync(path_file)){
        res.sendFile(path.resolve(path_file));
  }else{
        res.status(404).send({message: 'No existe la imagen...'});
  }
   
}








module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist, 
    uploadImage,
    getImageFile
};