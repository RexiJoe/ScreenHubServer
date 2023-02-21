const VideosModel = require("../../database/models/Videos");

function getVideoInfoService(req, res){
    try {
        const videoID = req.body.id;
    
        VideosModel.findOne({videoID: videoID}, {"videoID":1, "coverID":1, "description":1, "title":1, "username":1, "date":1})
        .then((data)=>{
            res.send(data);
        })
        .catch(err=> console.log("error al obtener la data"))
        
    } catch (err) {
        console.log("hubo un error")
    }
};

module.exports = getVideoInfoService;