'use strict'

// Importación de la biblioteca Mongoose para la gestión de la base de datos
var mongoose = require('mongoose');
// Creación del esquema de Mongoose
var Schema = mongoose.Schema;

// Definición del Esquema para el modelo de Album
var AlbumSchema = Schema({
    title: String,            // Título del álbum
    description: String,      // Descripción del álbum
    year: Number,             // Año de lanzamiento del álbum
    image: String,            // Ruta de la imagen del álbum
    // Relaciona el álbum con un artista mediante una referencia a su ID
    artist: { type: Schema.ObjectId, ref: 'Artist' }
});

/* Exportación del modelo Album para que pueda ser utilizado en otros archivos */
module.exports = mongoose.model('Album', AlbumSchema);
