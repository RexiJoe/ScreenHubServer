const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const UsersModel = require("../../database/models/Users");
const VideosModel = require("../../database/models/Videos");
require("dotenv").config();
const { Readable } = require("stream");

const client = new mongoose.mongo.MongoClient(process.env.DATABASE)

async function videoUploadService(req, res){

    const token = req.body.token;

    jwt.verify(token, "screenhub", async (err, data)=>{
        if(err){
            console.log("error with token verification");
            res.send("invalid token");
        }

        const userID = data.id;

        return UsersModel.findById(userID)
        .then((data)=>{

            //SAVE VIDEO
            const title = req.body.title

            const readableVideoStream = new Readable();
            readableVideoStream.push(req.files.video[0].buffer);
            readableVideoStream.push(null);

            const db = client.db("screenhub");

            const bucket = new mongoose.mongo.GridFSBucket(db, {bucketName: "videoFiles"});

            const uploadStream = bucket.openUploadStream(title);

            const id = uploadStream.id;

            readableVideoStream.pipe(uploadStream);

            //SAVE COVER

            const readableCoverStream = new Readable();
            readableCoverStream.push(req.files.cover[0].buffer);
            readableCoverStream.push(null);
            //console.log(req.files.cover[0].buffer)

            const coverBucket = new mongoose.mongo.GridFSBucket(db, {bucketName: "coverFiles"});
            const coverUploadStream = coverBucket.openUploadStream(title);
            const coverId = coverUploadStream.id;

            readableCoverStream.pipe(coverUploadStream);

            //SAVE VIDEO DATA

            const newVideo = new VideosModel({
                userID: userID,
                videoID: id,
                coverID: coverId,
                username: data.username,
                title: title,
                description: req.body.description,
                date: Date()
            });

            newVideo.save().catch((e)=> console.log(e));

            uploadStream.on("error", (e)=> console.log(e));
            uploadStream.on("finish", ()=> console.log("archivo subido, video ID: " + id + " cover ID: " + coverId))

            res.send("listo " + id);

        })
        .catch((err)=> console.log(err))

})
};

module.exports = videoUploadService;