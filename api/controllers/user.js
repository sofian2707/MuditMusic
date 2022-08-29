'use strict'


/* Importaciones */

//Permiten trabajar con los sistema de ficheros
var fs = require('fs');  
var path = require('path'); 


var User = require('../models/user');
var bcrypt = require('bcrypt-nodejs');
const { hash } = require('bcryptjs');
var jwt = require('../services/jwt');




function pruebas(req, res){
res.status(200).send({
    message: 'Probando una accion del controlador de usuarios del api rest con Node y Mongo'
});
}



function saveUser(req, res){
    var user = new User();

    //params es igual cuerpo de la peticion datos que llegan de post
    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if(params.password){
        //encriptar contraseña y guardar datos 
        bcrypt.hash(params.password, null, null, function(err,hash){
        user.password = hash;
        
        if(user.name != null && user.surname != null && user.email != null){
              //guardar el usuario
              user.save((err, userStored) =>{
                if(err){
                    res.status(500).send({message: 'Error al guardar el usuario'});
                }else{
                    if(!userStored){
                        res.status(404).send({message: 'No se ha registrado el usuario'});
                    }else{
                        res.status(200).send({user: userStored});
                    }
                }
              })
        }else{
            res.status(200).send({message: 'Rellena todos los campos'});
        }
        });

    }else{
        res.status(200).send({message: 'Introduce la contraseña'})
    }

}



//autenticacion de usuario 
function loginUser(req, res){
 var params = req.body;

 var email = params.email;
 var password = params.password;
 

 /* Encontrar al usuario por correo electrónico */
 User.findOne({email: email.toLowerCase()}, (err, user) => {
    if(err){
        res.status(500).send({message: 'Error en la peticion'});
    }else{
        /* Comprobando si el usuario existe */
        if(!user){
            res.status(404).send({message: 'El usuario no existe'});
        }else{
            // Si exite, comprobar la contraseña
            bcrypt.compare(password, user.password, function(err, check){
                if(check){
                    //devolver los datos del usuario logueado
                    if(params.gethash){
                        //devolver un token de jwt
                       // res.status(200).send({token: jwt.createToken(user)});
                        res.status(200).send({user, token: jwt.createToken(user)});
                    }
                }else{
                    res.status(404).send({message: 'El usuario no ha podido loguearse'});
                }

            });
        }
    }
 });
}



/**
 Toma el ID de usuario de los parámetros de la solicitud, la actualización del cuerpo de la solicitud 
 y luego encuentra el usuario por el ID de usuario y lo actualiza con la actualización.
 * @param req - El objeto de solicitud.
 * @param res - El objeto de respuesta.
 * 
 */

function updateUser(req, res){
    var userId = req.params.id;
    var update = req.body;

    /* Actualiza el usuario */
    User.findByIdAndUpdate(userId, update, (err, userUpdate)=>{
if(err){
    res.status(500).send({message: 'Error al actualizar el usuario'});
}else{
  
    if(!userUpdate){
        res.status(404).send({message: 'No se ha podido actualizar el usuario'});
    }else{
        res.status(200).send({user: userUpdate});
    }
}
    });
}

function uploadImage(req, res){
    var userId = req.params.id;
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
            User.findByIdAndUpdate(userId, {image: file_name}, (err, userUpdate) =>{
                if(!userUpdate){
                    res.status(404).send({message: 'No se ha podido actualizar el usuario'});
                }else{
                    res.status(200).send({image: file_name, user: userUpdate});
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
    var path_file = './uploads/users/'+imageFile;

    if(fs.existsSync(path_file)){
        res.sendFile(path.resolve(path_file));
  }else{
        res.status(404).send({message: 'No existe la imagen...'});
  }
   
}


/* Exportación de las funciones para ser utilizadas en otros archivos. */
module.exports = {
   pruebas,
   saveUser, 
   loginUser,
   updateUser,
   uploadImage,
   getImageFile
};