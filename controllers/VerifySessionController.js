const VerifySessionService = require("../services/verify session/VerifySessionService");


async function VerifySessionController(req, res){
    const token = req.body;
    const response = await VerifySessionService(token)
    res.send(response);
};

module.exports = VerifySessionController;