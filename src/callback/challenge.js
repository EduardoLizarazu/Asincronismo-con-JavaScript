// Implementación de una API con XMLHttpRquest

// instalamos por consola npm que nos va a permitir hacer peticiones "npm install xmlhttprequest --save"

// Instanciando el request.
//Permite hacer peticiones a algun servidor en la nube
let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const API = "https://rickandmortyapi.com/api/character/";

// La funcion en general nos va a permitir traer info de mi API
function fetchData(url_api, callback) {
    //referencia al objeto XMLHttpRequest
    let xhttp = new XMLHttpRequest();
    /* 
        A nuestra referencia xhttp le pasamos un LLAMADO 'open'
        donde: parametro1 = el metodo, parametro2 = la url,
        parametro3 = verificación si es asincrono o no, valor por defecto true
    */
    xhttp.open("GET", url_api, true)

    //Cuando el estado del objeto cambia, ejecutar la función:
    xhttp.onreadystatechange = function (event) {
        // voy a tener este espacio que me va a permitir hacer una validacion para saber si voy a ejecutar mi codigo
        // en este caso preguntamos en el estado en el que se encuentra
        /*
            los estados que puede tener son:
            estado 0: inicializado
            estado 1: cargando
            estado 2: ya se cargó
            estado 3: ya hay información
            estado 4: solicitud completa
            PD: recuerda estas trabajando con una API externa osea un servidor  por lo que depende del servidor cuanto demore en cada estado haces un pedido por datos (request) y solo es aplicar lógica.
        */
        if (xhttp.readyState === 4) {

            //Verificar estado, aqui un resumen de los casos mas comunes:
            /*
                ESTADO 1xx (100 - 199): Indica que la petición esta siendo  procesada.
                ESTADO 2xx (200 - 299): Indica que la petición fue recibida, aceptada y procesada correctamente.
                ESTADO 3xx (300 - 399): Indica que hay que tomar acciones   adicionales para completar la solicitud. Por lo general indican   redireccionamiento.
                ESTADO 4xx (400 - 499): Errores del lado del cliente. Indica se hizo mal la solicitud de datos.
                ESTADO 5xx (500 - 599): Errores del Servidor. Indica que fallo totalmente la ejecución.
                */
            if (xhttp.status === 200) {

                //Estandar de node con callbacks, primer parametro error, segundo el resultado
                callback(null, JSON.parse(xhttp.responseText));
            } else {
                const error = new Error("Error " + url_api);
                return callback(error, null);
            }
        }
    }
    xhttp.send(); // enviar solicitud
}

/**
 * Pusimos una nueva direccino en packeage.json
 * "callback:challenge": "node src/callback/challenge.js"
 * 
*/

// primero buscamos la lista de personajes
fetchData(API, function(error1, data1){
    // si error, matamos retornando un error
    if (error1) return console.error(error1);

    // luego buscamos en la api el id de Rick
    fetchData(API + data1.results[0].id, function(error2, data2) {
        if (error2) return console.error(error2); 

        // por ultimo la consulta a la api que contiene su dimension
        fetchData(data2.origin.url, function(error3, data3){
            if (error3) return console.error(error3);
            console.log(data1.info.count); 
            console.log(data2.name); 
            console.log(data3.dimension); 

            // rutas de las peticiones en orden
            console.log(API);
            console.log(API + data1.results[0].id); 
            console.log(data2.origin.url); 
        });
    })
})
