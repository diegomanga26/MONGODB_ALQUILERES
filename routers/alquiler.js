import { con } from "../db/atlas.js";
import { limitGet } from "../limit/config.js"
import { Router } from "express";

const appAlquiler = Router();

let db = await con();
let alquiler = db.collection("Alquiler");

appAlquiler.get("/", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await alquiler.find({}).toArray();
    res.send(result);
});

appAlquiler.get("/activo", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await alquiler.aggregate([
        {
            $lookup: {
                from: "Cliente",
                localField: "cliente",
                foreignField: "cliente",
                as: "fk_alquiler_cliente"
            }
        },
        {
            $match: {
                estado: "Activo"
            }
        },
        {
            $project: {
                "_id": 0,
                "inicio": 0,
                "fin": 0,
                "fk_alquiler_cliente._id": 0
            }
        }
    ]).toArray();
    res.send(result);
});

appAlquiler.get("/detalle/:alquiler", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    console.log(req.params);
    let idEsp = parseInt(req.params.alquiler)
    let result = await alquiler.aggregate([
        {
            $lookup: {
                from: "Cliente",
                localField: "cliente",
                foreignField: "cliente",
                as: "fk_alquiler_cliente"
            }
        },
        {
            $match: {
                alquiler: idEsp
            }
        },
        {
            $project: {
                "_id": 0,
                "fk_alquiler_cliente._id": 0
            }
        }
    ]).toArray();
    res.send(result);
});

appAlquiler.get("/costoAlquiler/:idAlquiler", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let idEsp = parseInt(req.params.idAlquiler)
    let result = await alquiler.find(
        {
            alquiler: idEsp
        },
        {
            _id: 0,
            cliente: 0,
            inicio: 0,
            fin: 0,
            estado: 0
        }
    ).toArray();
    res.send(result);
});

appAlquiler.get("/fecha/:fechax", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let fech = req.params.fechax
    let result = await alquiler.find(
    {
        inicio: { $eq: fech }
    }
).toArray();
    res.send(result);
});

appAlquiler.get("/total", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await alquiler.aggregate([
        { $count: 'alquiler' },
        {
            $project: {
                'Total de Alquileres': '$alquiler'
            }
        }
    ]).toArray();
    res.send(result);
});

appAlquiler.get("/fecha/:fechaIni/:fechaFin", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let fechaInicial = req.params.fechaIni;
    let fechaFinal = req.params.fechaFin;
    let result = await alquiler.find(
        {
            inicio: {
                $gte: fechaInicial,
                $lte: fechaFinal
            }
        },
        {
            _id: 0
        }
    ).toArray();
    res.send(result);
});

export default appAlquiler;