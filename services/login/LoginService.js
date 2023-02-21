const UsersModel = require("../../database/models/Users.js");
const jwt = require("jsonwebtoken");


async function LoginService(data){

    let response = null;

    return UsersModel.find({email: data.email, password: data.password})
    .then((match)=>{
        const user = match[0];
       response = {
            resMessage: "User logged successfuly",
            userData: {
                email: user.email,
                name: user.name,
                surname: user.surname,
                username: user.username,
                token: jwt.sign({id: user.id}, "screenhub", {expiresIn: (60*60)*24})
            },
            status: true 
        };
        return response;
    })
    .catch((err)=>{
        response = {
            resMessage: "Wrong email or password",
            userData: {
                token:""
            }
        };
        return response;
    })

};
module.exports = LoginService;