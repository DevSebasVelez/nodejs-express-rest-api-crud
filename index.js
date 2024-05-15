const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');


// Crear server de express
const app = express();

//Conexión con base de datos
dbConnection()


//CORS
app.use(cors())


//Directorio Publico
app.use( express.static('public') );

//Lectura y parseo del Body
app.use( express.json() );

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
})