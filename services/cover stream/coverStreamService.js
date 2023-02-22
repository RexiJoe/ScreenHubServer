const mongoose = require("mongoose");
require("dotenv").config();
const client = new mongoose.mongo.MongoClient(process.env.DATABASE);

async function coverStreamService(req, res){

    res.set("Content-Type", "image/jpeg");
    res.set("Accept-Ranges", "bytes");

    const coverID = req.params.coverID;
    const db = client.db("screenhub");

    const objID = new mongoose.mongo.ObjectId(coverID)
    const bucket = new mongoose.mongo.GridFSBucket(db, {bucketName: "coverFiles"})
    const dowloadStream = bucket.openDownloadStream(objID)

    dowloadStream.on("error", err=> console.log(err))

    dowloadStream.pipe(res)
    // dowloadStream.on("data", (chunk)=>{
    //     res.write(chunk);
    // });
    // dowloadStream.on("error", (e)=>{
    //     console.log(e);
    //     res.sendStatus(400);
    // });
    // dowloadStream.on("end", ()=>{res.end()})
};

module.exports = coverStreamService;