import { con } from "../db/atlas.js";
import { limitGet } from "../limit/config.js"
import { Router } from "express";

const appCliente = Router();

let db = await con();
let cliente = db.collection("Cliente");

appCliente.get("/", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await cliente.find({}).toArray();
    res.send(result);

});

appCliente.get("/DNI/:dniEspecifico", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let dniEsp = req.params.dniEspecifico
    let result = await cliente.find(
        {
            documento: dniEsp
        },
        {
            _id: 0
        }
    ).toArray();
    res.send(result);

});

appCliente.get("/minima", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await cliente.aggregate([
        {
            $lookup: {
                from: "Alquiler",
                localField: "cliente",
                foreignField: "cliente",
                as: "alquileres"
            }
        },
        {
            $match: {
                "alquileres": { $gt: [] }  // Filtrar los clientes con alquileres
            }
        },
        {
            $project: {
                _id: 0,
                cliente: 1,
                nombre: 1,
                apellido: 1,
                documento: 1,
                direccion: 1,
                numero: 1,
                Email: 1
            }
        }
    ]).toArray();
    res.send(result);

});
export default appCliente;