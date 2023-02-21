const express = require("express");
const LoginController = require("../controllers/LoginController.js");
const LoginRoute = express.Router();

LoginRoute.use(express.json());

LoginRoute.post("/", LoginController);

module.exports = LoginRoute