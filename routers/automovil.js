import { con } from "../db/atlas.js";
import { limitGet } from "../limit/config.js"
import { Router } from "express";

const appAutomovil = Router();

let db = await con();
let automovil = db.collection("Automovil");

appAutomovil.get("/", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await automovil.find({}).toArray();
    res.send(result);

});

appAutomovil.get("/disponibles", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await automovil.aggregate([
        {
            $lookup: {
                from: "Alquiler",
                localField: "automovil",
                foreignField: "automovil",
                as: "alquileres"
            }
        },
        {
            $unwind: "$alquileres",
        },
        {
            $match: {
                "alquileres.estado": "Disponible"
            }
        },
        {
            $project: {
                "_id": 0,
                "automovil": 0,
                "alquileres._id": 0
            }
        }
    ]).toArray();
    res.send(result);

});

appAutomovil.get("/auto5", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await automovil.find(
        {
            capacidad: { $gt: 5 }
        }
    ).toArray();
    res.send(result);

});

appAutomovil.get("/marca&modelo", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await automovil.aggregate([
        {
            $group: {
                _id: "$marca",
                modelos: {
                    $push: "$$ROOT"
                }
            }
        },
        {
            $project: {
                "modelos._id": 0,
                "modelos.marca": 0
            }
        },
        { $sort: { _id: 1 } }
    ]).toArray();
    res.send(result);

});

appAutomovil.get("/disponibles/:capacidadAuto", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let capacidad = parseInt(req.params.capacidadAuto)
    let result = await automovil.find(
        {
            capacidad: { $gt: capacidad }
        },
        {
            _id: 0
        }
    ).toArray();
    res.send(result);

});

export default appAutomovil;