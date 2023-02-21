const mongoose = require("mongoose");
const client = new mongoose.mongo.MongoClient("mongodb://127.0.0.1:27017/screenhub")

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
            const dowloadStream = bucket.openDownloadStream(objID,{start:start, end:end});

            dowloadStream.pipe(res)
        })           
    } catch (error) {
        console.log("hubo un error en la subida")
    };
};

module.exports = videoStreamService;