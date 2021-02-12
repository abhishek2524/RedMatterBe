import { application } from "express";
import express,{Response,Request} from "express";
import { dir } from "console";
const router = express.Router();
const fs = require('fs');
const path = require("path");
const Graph = require("../models/graphModel");
router.get( "/params", async( req:any, res:any ) => {
    const paramsPath = path.join(__dirname,"../sample_data/params.json")
    let paramsData = fs.readFileSync(paramsPath,"utf-8");
    paramsData = JSON.parse(paramsData);
    
    res.json( paramsData );
});

router.get( "/events", ( req:any, res:any ) => {
    const eventsPath = path.join(__dirname,"../sample_data/events.json")
    let eventsData = fs.readFileSync(eventsPath,"utf-8");
    eventsData = JSON.parse(eventsData);
    res.json( eventsData );
} );

router.get("/graphs",(req:any,res:any)=>{
    Graph.find({}).then((data:any)=>{
        res.send(data);
    });
    
})



module.exports = router;