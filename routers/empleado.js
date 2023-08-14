import { con } from "../db/atlas.js";
import { limitGet } from "../limit/config.js"
import { Router } from "express";

const appEmpleado = Router();

let db = await con();
let Empleado = db.collection("Empleado");

appEmpleado.get("/", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await Empleado.find({}).toArray();
    res.send(result);

});

appEmpleado.get("/vendedores", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await Empleado.find(
        {
            cargo: { $eq: "Vendedor" }
        }
    ).toArray();
    res.send(result);

});

appEmpleado.get("/gerente&asistente", limitGet(), async (req, res) => {
    if (!req.rateLimit) return;
    let result = await Empleado.find(
        {
            $or: [{ cargo: "Gerente" }, { cargo: "Asistente" }]
        },
        {
            _id: 0
        }
    ).toArray();
    res.send(result);

});

export default appEmpleado;