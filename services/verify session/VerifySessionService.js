const jwt = require("jsonwebtoken");
const UsersModel = require("../../database/models/Users.js");


async function VerifySessionService(token){

    const response = {
        resMessage: "User not verified, please log in or provide a valid token",
        userData: {},
        status: false
    };

    if(token.token == ""){
        return response;
    }

    return jwt.verify(token.token, "screenhub", (err, data)=>{
        if(err){
            response.resMessage = "An error has occurred with the token verification";
            return response
        }

        return UsersModel.findById(data.id)
        .then((data)=>{
            response.resMessage = "User verified, continue with your navigation";
            response.userData = {
                username: data.username,
                email: data.email,
                name: data.name,
                surname: data.surname
            };
            response.status = true;
            return response;
        })
        .catch((err)=>{
            response.resMessage = "An error has occurred with the database request"
            return response
        })
    })

};

module.exports = VerifySessionService;