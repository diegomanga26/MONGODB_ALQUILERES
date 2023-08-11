import dotenv from 'dotenv';
import express from 'express';
import appCliente from './routers/cliente.js';
dotenv.config();
let appExpress = express();

appExpress.use(express.json());
appExpress.use("/cliente", appCliente);


let config = JSON.parse(process.env.myServer);
appExpress.listen(config, ()=> {
    console.log(`http://${config.hostname}:${config.port}`);
});