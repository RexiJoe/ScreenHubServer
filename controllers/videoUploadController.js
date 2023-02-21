const videoUploadService = require("../services/video upload/videoUploadService");


async function videoUploadController(req, res){
    const response = await videoUploadService(req, res);
    return response
};

module.exports = videoUploadController;