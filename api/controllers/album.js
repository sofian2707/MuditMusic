'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

//obtener album
function getAlbum(req, res){
    var albumId = req.params.id;
    //obtener datos del artista
    Album.findById(albumId).populate({path: 'artist'}).exec((err, album) => {
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!album){
                res.status(404).send({message: 'El album no existe'});
            }else{
                res.status(200).send({album});
            }
        }
    });


}

//guardar album
function saveAlbum(req, res){
    var album = new Album();

    var params = req.body;
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStored) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!albumStored){
                res.status(404).send({message: 'No se ha guardado el album'});
            }else{
                res.status(200).send({album: albumStored});
            }
        }
    })
}

//obtener todos los album
function getAlbums(req, res){
    var artistId = req.params.artist;

    if(!artistId){
        //sacar todos los album de la bbdd
        var find = Album.find({}).sort('title');
    }else{
        //sacar los album de un artista concreto de la bbdd
        var find = Album.find({artist: artistId}).sort('year');
    }

    find.populate({path: 'artist'}).exec((err, albums) =>{
        if(err){
            res.status(500).send({message: 'Error en la peticion'});
        }else{
            if(!albums){
                res.status(404).send({message: 'No hay albums'});
            }else{
                res.status(200).send({albums});
            }
        }

    });
}

function updateAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(!albumUpdated){
                res.status(404).send({message: 'No se ha actualizado el album'});
            }else{
                res.status(200).send({album: albumUpdated});
            }
        }
    });
}

//Eliminar album
function deleteAlbum(req, res){
    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if(err){
            res.status(500).send({message: 'Error al eliminar el album'});
        }else{
            if(!albumRemoved){
                res.status(404).send({message: 'El album no ha sido eliminado'});
            }else{

                Song.find({album: albumRemoved._id}).deleteOne((err, songRemoved) =>{
                    if(err){
                        res.status(500).send({message: 'Error al eliminar la cancion '});
                    }else{
                        if(!songRemoved){
                            res.status(404).send({message: 'La cancion no ha sido eliminada'});
                        }else{
                            res.status(200).send({album: albumRemoved});
                        }
                    }
                })
            }
        }
    });
}


function uploadImage(req, res){
    var albumId = req.params.id;
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
            Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) =>{
                if(!albumUpdated){
                    res.status(404).send({message: 'No se ha podido actualizar el album'});
                }else{
                    res.status(200).send({album: albumUpdated});
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
    var path_file = './uploads/albums/'+imageFile;

    if(fs.existsSync(path_file)){
        res.sendFile(path.resolve(path_file));
  }else{
        res.status(404).send({message: 'No existe la imagen...'});
  }
   
}














module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
}
