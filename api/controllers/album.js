'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

// Obtener información de un álbum específico por su ID
function getAlbum(req, res) {
    var albumId = req.params.id; // Obtener el ID del álbum desde los parámetros de la solicitud
    
    // Buscar el álbum en la base de datos y poblar la información del artista asociado
    Album.findById(albumId).populate({ path: 'artist' }).exec((err, album) => {
        if (err) {
            // Si hay un error en la búsqueda, enviar una respuesta con el código de error 500
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!album) {
                // Si no se encuentra el álbum, enviar una respuesta con el código de error 404
                res.status(404).send({ message: 'El álbum no existe' });
            } else {
                // Si el álbum se encuentra, enviar la información del álbum con el código de éxito 200
                res.status(200).send({ album });
            }
        }
    });
}

// Guardar un nuevo álbum en la base de datos
function saveAlbum(req, res) {
    var album = new Album(); // Crear una nueva instancia del modelo Album
    var params = req.body; // Obtener los datos del álbum desde el cuerpo de la solicitud

    // Asignar los valores del cuerpo de la solicitud a las propiedades del álbum
    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null'; // Inicialmente, no hay imagen asignada
    album.artist = params.artist;

    // Guardar el álbum en la base de datos
    album.save((err, albumStored) => {
        if (err) {
            // Si hay un error al guardar, enviar una respuesta con el código de error 500
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!albumStored) {
                // Si el álbum no se guarda, enviar una respuesta con el código de error 404
                res.status(404).send({ message: 'No se ha guardado el álbum' });
            } else {
                // Si el álbum se guarda correctamente, enviar la información del álbum con el código de éxito 200
                res.status(200).send({ album: albumStored });
            }
        }
    });
}

// Obtener todos los álbumes o los álbumes de un artista específico
function getAlbums(req, res) {
    var artistId = req.params.artist; // Obtener el ID del artista desde los parámetros de la solicitud

    // Si se proporciona un ID de artista, buscar los álbumes asociados a ese artista; de lo contrario, buscar todos los álbumes
    var find = artistId ? Album.find({ artist: artistId }).sort('year') : Album.find({}).sort('title');

    // Buscar los álbumes en la base de datos y poblar la información del artista asociado
    find.populate({ path: 'artist' }).exec((err, albums) => {
        if (err) {
            // Si hay un error en la búsqueda, enviar una respuesta con el código de error 500
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            if (!albums) {
                // Si no se encuentran álbumes, enviar una respuesta con el código de error 404
                res.status(404).send({ message: 'No hay álbumes' });
            } else {
                // Si se encuentran álbumes, enviar la lista de álbumes con el código de éxito 200
                res.status(200).send({ albums });
            }
        }
    });
}

// Actualizar la información de un álbum específico por su ID
function updateAlbum(req, res) {
    var albumId = req.params.id; // Obtener el ID del álbum desde los parámetros de la solicitud
    var update = req.body; // Obtener los datos de actualización desde el cuerpo de la solicitud

    // Buscar el álbum por ID y actualizarlo con los nuevos datos
    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if (err) {
            // Si hay un error al actualizar, enviar una respuesta con el código de error 500
            res.status(500).send({ message: 'Error en el servidor' });
        } else {
            if (!albumUpdated) {
                // Si el álbum no se actualiza, enviar una respuesta con el código de error 404
                res.status(404).send({ message: 'No se ha actualizado el álbum' });
            } else {
                // Si el álbum se actualiza correctamente, enviar la información del álbum actualizado con el código de éxito 200
                res.status(200).send({ album: albumUpdated });
            }
        }
    });
}

// Eliminar un álbum específico por su ID
function deleteAlbum(req, res) {
    var albumId = req.params.id; // Obtener el ID del álbum desde los parámetros de la solicitud

    // Buscar el álbum por ID y eliminarlo de la base de datos
    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if (err) {
            // Si hay un error al eliminar, enviar una respuesta con el código de error 500
            res.status(500).send({ message: 'Error al eliminar el álbum' });
        } else {
            if (!albumRemoved) {
                // Si el álbum no se elimina, enviar una respuesta con el código de error 404
                res.status(404).send({ message: 'El álbum no ha sido eliminado' });
            } else {
                // Buscar y eliminar las canciones asociadas al álbum eliminado
                Song.find({ album: albumRemoved._id }).deleteOne((err, songRemoved) => {
                    if (err) {
                        // Si hay un error al eliminar las canciones, enviar una respuesta con el código de error 500
                        res.status(500).send({ message: 'Error al eliminar la canción' });
                    } else {
                        if (!songRemoved) {
                            // Si no se eliminan canciones, enviar una respuesta con el código de error 404
                            res.status(404).send({ message: 'La canción no ha sido eliminada' });
                        } else {
                            // Si se eliminan canciones correctamente, enviar la información del álbum eliminado con el código de éxito 200
                            res.status(200).send({ album: albumRemoved });
                        }
                    }
                });
            }
        }
    });
}

// Cargar una imagen para un álbum
function uploadImage(req, res) {
    var albumId = req.params.id; // Obtener el ID del álbum desde los parámetros de la solicitud
    var file_name = 'No subido..'; // Nombre del archivo de imagen (por defecto)

    if (req.files) {
        var file_path = req.files.image.path; // Obtener la ruta del archivo de imagen subido
        // Dividir la ruta del archivo para obtener el nombre del archivo
        var file_split = file_path.split('\\');
        var file_name = file_split[2];
        // Dividir el nombre del archivo para obtener la extensión
        var ext_split = file_name.split('.');
        var file_ext = ext_split[1];

        // Validar la extensión del archivo (solo imágenes permitidas)
        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            // Actualizar el álbum con el nombre de la imagen cargada
            Album.findByIdAndUpdate(albumId, { image: file_name }, (err, albumUpdated) => {
                if (!albumUpdated) {
                    // Si no se actualiza el álbum, enviar una respuesta con el código de error 404
                    res.status(404).send({ message: 'No se ha podido actualizar el álbum' });
                } else {
                    // Si se actualiza el álbum correctamente, enviar la información del álbum con el código de éxito 200
                    res.status(200).send({ album: albumUpdated });
                }
            });
        } else {
            // Si la extensión del archivo no es válida, enviar una respuesta con un mensaje
            res.status(200).send({ message: 'Extensión del archivo no válida' });
        }
    } else {
        // Si no se ha subido ninguna imagen, enviar una respuesta con un mensaje
        res.status(200).send({ message: 'No has subido ninguna imagen' });
    }
}

// Obtener una imagen específica por su nombre de archivo
function getImageFile(req, res) {
    var imageFile = req.params.imageFile; // Obtener el nombre del archivo de imagen desde los parámetros de la solicitud
    var path_file = './uploads/albums/' + imageFile; // Construir la ruta completa del archivo de imagen

    // Verificar si el archivo existe en la ruta especificada
    if (fs.existsSync(path_file)) {
        // Enviar el archivo de imagen como respuesta
        res.sendFile(path.resolve(path_file));
    } else {
        // Si el archivo no existe, enviar una respuesta con el código de error 404
        res.status(404).send({ message: 'No existe la imagen...' });
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
