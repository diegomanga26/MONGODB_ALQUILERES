import { con } from "../db/atlas.js";
import { limitGet } from "../limit/config.js"
import { Router } from "express";

const appSucursalAutomovil = Router();

let db = await con();
let sucursalAutomovil = db.collection("Sucursal_automovil");

appSucursalAutomovil.get("/", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await sucursalAutomovil.find({}).toArray();
    res.send(result);

});

appSucursalAutomovil.get("/autosDisponibles", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await sucursalAutomovil.aggregate([
        {
            $lookup: {
                from: "Sucursal",
                localField: "sucursal",
                foreignField: "sucursal_id",
                as: "fk_sucursal"
            }
        },
        {
            $unwind: "$fk_sucursal"
        },
        {
            $group: {
                _id: "$fk_sucursal.nombre",
                Cantidad_Disponible: {
                    $sum: "$cantidad_autos"
                }
            }
        }
    ]).toArray();
    res.send(result);

});

export default appSucursalAutomovil;