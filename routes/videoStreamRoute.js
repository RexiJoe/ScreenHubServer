const express = require("express");
const videoStreamService = require("../services/video stream/videoStreamService");
const videoStreamRoute = express.Router();

videoStreamRoute.get("/:videoID", videoStreamService);

module.exports = videoStreamRoute;