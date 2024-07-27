'use strict';

/* Importaciones */

// Permite trabajar con el sistema de ficheros
var fs = require('fs');

// Permite trabajar con rutas de archivos y directorios
var path = require('path');

// Modelos y servicios
var User = require('../models/user'); // Importación del modelo de usuario
var bcrypt = require('bcrypt-nodejs'); // Biblioteca para encriptar contraseñas
var jwt = require('../services/jwt'); // Servicio JWT para la generación de tokens

/**
 * Función de prueba para verificar la funcionalidad del controlador de usuarios
 * @param req - El objeto de solicitud.
 * @param res - El objeto de respuesta.
 */
function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando una acción del controlador de usuarios del API REST con Node y Mongo'
    });
}


/**
 * Función para guardar un nuevo usuario en la base de datos.
 * @param req - El objeto de solicitud.
 * @param res - El objeto de respuesta.
 */

function saveUser(req, res) {
    var user = new User();
    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if (params.password) {
        // Verificar si el correo electrónico ya está registrado
        User.findOne({ email: params.email.toLowerCase() }, (err, existingUser) => {
            if (err) {
                res.status(500).send({ message: 'Error en la petición' });
            } else {
                if (existingUser) {
                    // El correo electrónico ya está registrado
                    res.status(200).send({ message: 'El correo electrónico ya está registrado' });
                } else {
                    // El correo electrónico no está registrado, continuar con el registro
                    // Encriptar contraseña y guardar datos
                    bcrypt.hash(params.password, null, null, function (err, hash) {
                        user.password = hash;

                        if (user.name && user.surname && user.email) {
                            // Guardar el usuario
                            user.save((err, userStored) => {
                                if (err) {
                                    res.status(500).send({ message: 'Error al guardar el usuario' });
                                } else {
                                    if (!userStored) {
                                        res.status(404).send({ message: 'No se ha registrado el usuario' });
                                    } else {
                                        res.status(200).send({ user: userStored });
                                    }
                                }
                            });
                        } else {
                            res.status(200).send({ message: 'Rellena todos los campos' });
                        }
                    });
                }
            }
        });
    } else {
        res.status(200).send({ message: 'Introduce la contraseña' });
    }
}

/**
 * Función para autenticar a un usuario y devolver un token JWT.
 * @param req - El objeto de solicitud.
 * @param res - El objeto de respuesta.
 */

function loginUser(req, res) {
    var params = req.body;
    var email = params.email;
    var password = params.password;

    // Encontrar al usuario por correo electrónico
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
            res.status(500).send({ message: 'Error en la petición' });
        } else {
            // Comprobando si el usuario existe
            if (!user) {
                res.status(404).send({ message: 'El usuario no existe' });
            } else {
                // Si existe, comprobar la contraseña
                bcrypt.compare(password, user.password, function (err, check) {
                    if (check) {
                        // Devolver los datos del usuario logueado
                        if (params.gethash) {
                            // Devolver un token de JWT
                            res.status(200).send({ user, token: jwt.createToken(user) });
                        } else {
                            res.status(200).send({ user });
                        }
                    } else {
                        res.status(404).send({ message: 'El usuario no ha podido loguearse' });
                    }
                });
            }
        }
    });
}

/**
 * Función para actualizar la información de un usuario.
 * @param req - El objeto de solicitud.
 * @param res - El objeto de respuesta.
 */
function updateUser(req, res) {
    var userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub) {
        return res.status(500).send({ message: 'No tienes permiso para actualizar este usuario' });
    }

    // Actualiza el usuario
    User.findByIdAndUpdate(userId, update, (err, userUpdate) => {
        if (err) {
            res.status(500).send({ message: 'Error al actualizar el usuario' });
        } else {
            if (!userUpdate) {
                res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
            } else {
                res.status(200).send({ user: userUpdate });
            }
        }
    });
}

/**
 * Función para subir una imagen de perfil de usuario.
 * @param req - El objeto de solicitud.
 * @param res - El objeto de respuesta.
 */
function uploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'No subido...';

    if (req.files) {
        var file_path = req.files.image.path;

        // Dividir la ruta del archivo en una matriz y luego obtener el tercer elemento de la matriz.
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        // Dividir el nombre del archivo en una matriz y obtener la extensión del archivo.
        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif' || file_ext == 'jpeg') {
            User.findByIdAndUpdate(userId, { image: file_name }, (err, userUpdate) => {
                if (!userUpdate) {
                    res.status(404).send({ message: 'No se ha podido actualizar el usuario' });
                } else {
                    res.status(200).send({ image: file_name, user: userUpdate });
                }
            });
        } else {
            res.status(200).send({ message: 'Extensión del archivo no válida' });
        }
    } else {
        res.status(200).send({ message: 'No has subido ninguna imagen' });
    }
}

/**
 * Función para obtener una imagen de perfil de usuario.
 * @param req - El objeto de solicitud.
 * @param res - El objeto de respuesta.
 */
function getImageFile(req, res) {
    // Recuperar parámetro que llega por URL
    var imageFile = req.params.imageFile;
    var path_file = './uploads/users/' + imageFile;

    if (fs.existsSync(path_file)) {
        res.sendFile(path.resolve(path_file));
    } else {
        res.status(404).send({ message: 'No existe la imagen...' });
    }
}

/* Exportación de las funciones para ser utilizadas en otros archivos. */
module.exports = {
    pruebas,
    saveUser,
    loginUser,
    updateUser,
    uploadImage,
    getImageFile,
};
