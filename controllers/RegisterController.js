const RegisterService = require("../services/register/RegisterServices");


async function RegisterController(req, res){
    const registerData = req.body;
    const registerResponse = await RegisterService(registerData);
    res.send(registerResponse);
    console.log(registerResponse)
};

module.exports = RegisterController