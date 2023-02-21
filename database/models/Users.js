const {Schema, model} = require("mongoose");

const usersSchema = new Schema({
    userID: String,
    username: {
        type: String,
        required:[true, "Username is required"],
    },
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    surname: {
        type: String,
        required: [true, "Surname is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
});

module.exports = model("users", usersSchema)