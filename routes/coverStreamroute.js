const express = require("express");
const coverStreamService = require("../services/cover stream/coverStreamService");
const coverStreamRoute = express.Router();

coverStreamRoute.get("/:coverID", coverStreamService);

module.exports = coverStreamRoute;