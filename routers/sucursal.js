import { con } from "../db/atlas.js";
import { limitGet } from "../limit/config.js"
import { Router } from "express";

const appSucursal = Router();

let db = await con();
let sucursal = db.collection("Sucursal");

appSucursal.get("/", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await sucursal.find({}).toArray();
    res.send(result);

});

appSucursal.get("/automoviles", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await sucursal.aggregate([
        {
            $lookup: {
                from: "Sucursal_automovil",
                localField: "sucursal_id",
                foreignField: "sucursal",
                as: "automoviles"
            }
        },
        {
            $unwind: "$automoviles"
        },
        {
            $lookup: {
                from: "Automovil",
                localField: "automoviles.automovil",
                foreignField: "automovil",
                as: "info_automovil"
            }
        },
        {
            $group: {
                _id: {
                    sucursal_id: "$sucursal_id",
                    nombre: "$nombre",
                    direccion: "$direccion"
                },
                cantidad_automoviles: { $sum: "$automoviles.cantidad_autos" }
            }
        },
        {
            $project: {
                _id: 0,
                sucursal_id: "$_id.sucursal_id",
                nombre_sucursal: "$_id.nombre",
                direccion: "$_id.direccion",
                cantidad_automoviles: 1
            }
        }
    ]).toArray();
    res.send(result);
});

export default appSucursal;