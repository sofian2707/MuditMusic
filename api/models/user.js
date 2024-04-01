'use strict'

//acceso a la bd
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema 
var UserSchema = Schema({
    name: String,
    surname: String,
    email: { type: String, unique: true },
    password: String,
    role: String,
    image: String,
    favsong: {type: Schema.ObjectId, ref: 'FavSong'}

});

module.exports = mongoose.model('User', UserSchema);