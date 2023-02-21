const LoginService = require("../services/login/LoginService");


async function LoginController(req, res){
    const loginData = req.body;
    const response = await LoginService(loginData);
    res.send(response);
};

module.exports = LoginController