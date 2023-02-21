const UsersModel = require("../../database/models/Users.js");
const jwt = require("jsonwebtoken");
const crypto = require("crypto")


async function RegisterService(data){

    const response = {resMessaje:"", token:null};
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(data.email !== "" && !regexEmail.test(data.email)){
        response.resMessaje = "Correo electronico invalido, por favor ingrese un correo electronico valido"
        return response
    };

    const newUser = new UsersModel(
        {
            userID: crypto.randomUUID(),
            username: data.username,
            name: data.name,
            surname: data.surname,
            email: data.email,
            password: data.password
        }
    );

    return newUser.save().then((d)=>{
        response.resMessaje = "Your user has been registered successfully";
        response.token = jwt.sign({id: d.id}, "screenhub", {expiresIn: (60*60)*24})
        console.log("User has been registered")
        return response
    })
    .catch((err)=>{
        response.resMessaje = "An error has occurred, this might be because you didn't filled out the fields correctly or the email has been registered before";
        console.log(err);
        console.log("error while saving register data");
        return response
    })
    
};

module.exports = RegisterService