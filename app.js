import dotenv from 'dotenv';
import express from 'express';
import appCliente from './routers/cliente.js';
import appAlquiler from './routers/alquiler.js';
import appAutomovil from './routers/automovil.js';
import appEmpleado from './routers/empleado.js';
import appReserva from './routers/reserva.js';
import appSucursalAutomovil from './routers/sucursalAutomovil.js';
import appSucursal from './routers/sucursal.js';

dotenv.config();
let appExpress = express();

appExpress.use(express.json());
appExpress.use("/cliente", appCliente);
appExpress.use("/alquiler", appAlquiler);
appExpress.use("/empleado", appEmpleado);
appExpress.use("/automovil", appAutomovil);
appExpress.use("/reserva", appReserva);
appExpress.use("/sucursalAutomovil", appSucursalAutomovil);
appExpress.use("/sucursal", appSucursal);


let config = JSON.parse(process.env.myServer);
appExpress.listen(config, ()=> {
    console.log(`http://${config.hostname}:${config.port}`);
});