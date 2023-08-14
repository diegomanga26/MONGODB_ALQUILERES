import { con } from "../db/atlas.js";
import { limitGet } from "../limit/config.js"
import { Router } from "express";

const appReserva = Router();

let db = await con();
let reserva = db.collection("Reserva");

appReserva.get("/", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await reserva.find({}).toArray();
    res.send(result);

});

appReserva.get("/pendientes", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await reserva.aggregate([
        {
            $match: {
                estado: "Pendiente"
            }
        },
        {
            $lookup: {
                from: "Cliente",
                localField: "cliente",
                foreignField: "cliente",
                as: "fk_cliente"
            }
        },
        {
            $lookup: {
                from: "Automovil",
                localField: "automovil",
                foreignField: "automovil",
                as: "fk_automovil"
            }
        },
        {
            $unwind: "$fk_automovil",
        },
        {
            $unwind: "$fk_cliente"
        },
        {
            $project: {
                "_id": 0,
                "fk_cliente._id": 0,
                "fk_automovil._id": 0
            }
        }
    ]).toArray();
    res.send(result);

});

appReserva.get("/cliente/:clienteEsp", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let clienteEspecifico = parseInt(req.params.clienteEsp)
    let result = await reserva.find(
        {
            cliente: clienteEspecifico
        },
        {
            _id: 0
        }
    ).toArray();
    res.send(result);

});

appReserva.get("/:idReserva", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let idEsp = parseInt(req.params.idReserva)
    let result = await reserva.aggregate([
        {
            $match: {
                reserva: idEsp
            }
        },
        {
            $lookup: {
                from: "Cliente",
                localField: "cliente",
                foreignField: "cliente",
                as: "datos_cliente"
            }
        },
        {
            $unwind: "$datos_cliente"
        },
        {
            $project: {
                _id: 0,
                reserva: 1,
                cliente: "$datos_cliente.cliente",
                nombre: "$datos_cliente.nombre",
                apellido: "$datos_cliente.apellido",
                documento: "$datos_cliente.documento",
                direccion: "$datos_cliente.direccion",
                numero: "$datos_cliente.numero",
                Email: "$datos_cliente.Email"
            }
        }
    ]).toArray();
    res.send(result);

});

export default appReserva;