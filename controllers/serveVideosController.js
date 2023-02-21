const searchVideosService = require("../services/serve videos/searchVideosService");


async function serveVideosController(req, res){
    const search = req.body.search;
    const response = await searchVideosService(search);
    res.send(response);
};

module.exports = serveVideosController;