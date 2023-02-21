const {Schema, model} = require("mongoose");

const videoSchema = new Schema({
    userID: String,
    videoID: String,
    coverID: String,
    username: String,
    title: String,
    description: String,
    date: String
});

module.exports = model("videos", videoSchema)