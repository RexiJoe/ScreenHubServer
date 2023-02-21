const express = require("express");
const RegisterController = require("../controllers/RegisterController");
const RegisterRoute = express.Router();

RegisterRoute.use(express.json());

RegisterRoute.post("/", RegisterController);

module.exports = RegisterRoute