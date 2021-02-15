import express,{Application,Response,Request} from "express";
var ObjectId = require('mongoose').Types.ObjectId; 
const router = express.Router();
const fs = require('fs');
const path = require("path");
const Graph = require("../models/graphModel");
interface paramsData{
    "key": any;
    "value": string;
    "display": string;
}
router.get( "/params", async( req:Request, res:Response ) => {
    try{
        const paramsPath = path.join(__dirname,"../sample_data/params.json")
        let paramsData = fs.readFileSync(paramsPath,"utf-8");
        paramsData = JSON.parse(paramsData);
        res.status(200).json( paramsData );
    }catch(e){
        res.status(500).json( [] );
    }
});

router.get( "/events", ( req:Request, res:Response ) => {
    try{
        const eventsPath = path.join(__dirname,"../sample_data/events.json")
        let eventsData = fs.readFileSync(eventsPath,"utf-8");
        eventsData = JSON.parse(eventsData);
        res.status(200).json( eventsData );
    }catch(e){
        res.status(500).json([])
    }
} );

router.get("/graphs",(req:Request,res:Response)=>{
    Graph.find({}).then((data:any)=>{
        res.status(200).send(data);
    });
})

router.post("/graphs/:workspaceid",async(req:Request,res:Response)=>{
    try{
        Graph.find({"workspaceId":new ObjectId(req.params.workspaceid)},{"graphs._id":0,graphs:{$slice:-1},_id:0,workspaceId:0,__v:0})
        .then((data:any)=>{
            const lastGraphdata = data[0].graphs;
            const graphName = lastGraphdata[0].graphName;
            lastGraphdata[0]['graphName'] = 'graph'+(parseInt(graphName.split("graph")[1])+1);
            lastGraphdata[0]['index'] = lastGraphdata[0].index+1;
            Graph.updateOne({"workspaceId":new ObjectId(req.params.workspaceid)},{
                $push:{graphs:lastGraphdata}
            })
            .then((updatedData:any)=>{
                // Graph.find({"workspaceId":new ObjectId(req.params.workspaceid)})
                Graph.find({})
                .then((data:any)=>{
                    res.status(200).json({status:200,data:data});
                })
                .catch((err:any)=>{
                    console.log(err)
                    res.status(500).json({status:500,data:[]});
                })
            })
            .catch((err:any)=>{
                res.status(500).send("Not Added2");
            })
        })
        .catch((err:any)=>{
            console.log(err);
            res.status(404).send("No data");
        });
    }catch(e){
        res.status(500).send("Error")
    }
})

router.patch("/graphs/:workspaceid/:graphid/",(req:Request,res:Response)=>{
    const workspaceId = req.params.workspaceid;
    const graphid = req.params.graphid;
    const paramX = req.query.paramX;
    const paramY = req.query.paramY;
    let qry:any = {}
    if(paramX != undefined){
        qry['graphs.$.paramX'] = Number(paramX);
    }
    if(paramY != undefined){
        qry['graphs.$.paramY'] = Number(paramY);
    }
    const paramsPath = path.join(__dirname,"../sample_data/params.json")
    let paramsData = JSON.parse(fs.readFileSync(paramsPath,"utf-8"));
    paramsData.map((data:paramsData)=>{
        if(paramX != undefined){
            if(data.key == paramX){
                qry['graphs.$.paramXName'] = data.value;
            }
        }
        if(paramY != undefined){
            if(data.key == paramY){
                qry['graphs.$.paramYName'] = data.value;
            }
        }
    })
    Graph.findOneAndUpdate({workspaceId:ObjectId(workspaceId),"graphs._id":ObjectId(graphid)},{
            $set:qry
        },{new: true}).
        then((data:any)=>{
            Graph.find({
                "graphs._id":ObjectId(graphid)
            },{
                _id:0,
                graphs:{$elemMatch:{
                    "_id":ObjectId(graphid)
                }}
            })
            .then((data:any)=>{
                res.status(200).json({data:data[0],status:200})
            })
        })
        .catch((err:any)=>{
            res.status(500).json({data:err,status:500})
        })
})


module.exports = router;
