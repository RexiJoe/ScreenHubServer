const VideosModel = require("../../database/models/Videos");

async function serveVideosService(req, res){

    VideosModel.find({},{"videoID":1, "coverID":1, "description":1, "title":1, "username":1, "date":1}).limit(20)
        .then((data)=>{
            res.send(data)
        })
};

module.exports = serveVideosService;