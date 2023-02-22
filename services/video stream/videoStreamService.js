const mongoose = require("mongoose");
require("dotenv").config();
const client = new mongoose.mongo.MongoClient(process.env.DATABASE)

async function videoStreamService(req, res){
    
    try {
        res.set("Content-Type", "video/mp4");
        res.set("Accept-Ranges", "bytes");
        
        const videoID = req.params.videoID;
        const db = client.db("screenhub");
        const objID = new mongoose.mongo.ObjectId(videoID);
        db.collection("videoFiles.files").findOne({_id:objID})
        .then((video)=>{
            const videoSize = video["length"];
            const end = videoSize - 1;
            const start = 0
            res.set("Content-Range", `bytes ${start}-${end}/${videoSize}`)
            res.set("Content-Length", videoSize);
            const bucket = new mongoose.mongo.GridFSBucket(db, {bucketName: "videoFiles"})
            const downloadStream = bucket.openDownloadStream(objID,{start:start, end:end});

            downloadStream.on("data", (chunk)=>{
                res.write(chunk);
            })
            downloadStream.on("error",(e)=> {
                console.log(e)
                res.sendStatus(400)
            });
            downloadStream.on("end", ()=>{res.end()})

            //downloadStream.pipe(res)
        })           
    } catch (error) {
        console.log("hubo un error en la subida")
    };
};

module.exports = videoStreamService;