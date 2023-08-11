import { ObjectId } from "mongodb";
import {con} from "../db/atlas.js";
import {limitGet} from '../limit/config.js';
import {Router} from "express";
const appCampus = Router();

appCampus.get('/', limitGet(), async(req, res) =>{
    if(!req.rateLimit) return;
    let { id } = req.body
    let db = await con();
    let usuario = db.collection('usuario');
    let result = await usuario.find({_id : new ObjectId(id)}).toArray();
    res.send(result)
});

appCampus.post('/', limitGet(), async(req, res) => {
    if(!req.rateLimit) return;
    let db = await con();
    let usuario = db.collection('usuario');
    try {
        let result = await usuario.insertOne(req.body);
        console.log(result);
        res.send(":)");
    } catch (error) {
        console.log(error.errInfo.details.schemaRulesNotSatisfied[0]);
        res.send(":(");
    }
});

appCampus.delete('/', limitGet(), async(req, res) => {
    if(!req.rateLimit) return;
    let db = await con();
    let {id} = req.body;
    let usuario = db.collection('usuario');
    try {
        let result = await usuario.deleteOne({_id : new ObjectId(id)});
        console.log(result);
        if()
        res.send(":)");
    } catch (error) {
        res.send(":(");
    }
});

export default appCampus;