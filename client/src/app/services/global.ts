/**
 * Objeto GLOBAL que contiene configuraciones globales para la aplicación.
 * 
 * Este objeto se exporta para ser utilizado en otros módulos de la aplicación. 
 * Contiene la URL base para la API y la dirección IP del servidor.
 */

export var GLOBAL = {
     /**
     * URL base de la API.
     * 
     * Esta es la dirección base que se utiliza para todas las solicitudes HTTP
     * que se realicen a la API de la aplicación. En este caso, la API está 
     * alojada en un servidor local en el puerto 3000 y las solicitudes se enviarán 
     * al endpoint '/api/'.
     */
    url:'http://localhost:3000/api/',

    /**
     * Dirección IP del servidor.
     * 
     * Es la dirección de loopback local ('127.0.0.1'), lo que significa que el 
     * servidor está corriendo en la misma máquina desde la que se realizan las solicitudes.
     */
    ip: '127.0.0.1'

};