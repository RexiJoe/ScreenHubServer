const VideosModel = require("../../database/models/Videos");


async function searchVideosService(search){

    const regex = new RegExp(`.*${search}.*`,"i");

    return VideosModel.find({title: regex},{"videoID":1, "coverID":1, "description":1, "title":1, "username":1, "date":1}).limit(2)
        .then((data)=>{
            return data
        })

};

module.exports = searchVideosService;