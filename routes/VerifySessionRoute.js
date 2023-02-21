const express = require("express");
const jwt = require("jsonwebtoken");
const VerifySessionController = require("../controllers/VerifySessionController");
const VerifySessionRoute = express.Router();

VerifySessionRoute.use(express.json());

VerifySessionRoute.post("/", VerifySessionController);

module.exports = VerifySessionRoute;