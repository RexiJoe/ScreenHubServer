const express = require("express");
const getVideoInfoService = require("../services/get video info/getVideoInfoService");
const getVideoInfoRoute = express.Router();

getVideoInfoRoute.use(express.json());

getVideoInfoRoute.post("/", getVideoInfoService);

module.exports = getVideoInfoRoute;