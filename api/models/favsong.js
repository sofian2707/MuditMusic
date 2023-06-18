'use strict'

//acceso a la bd
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Esquema 
var FavSongSchema = Schema({
    //relaciona favsong con usuario y canciones
    user: {type: Schema.ObjectId, ref: 'User'},
    song: {type: Schema.ObjectId, ref: 'Song'}
});

module.exports = mongoose.model('FavSong', FavSongSchema, 'favsongs');