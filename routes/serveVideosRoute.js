const express = require("express");
const serveVideosController = require("../controllers/serveVideosController");
const serveVideosService = require("../services/serve videos/serveVideosService");
const serveVideosRouter = express.Router();

serveVideosRouter.use(express.json());

serveVideosRouter.post("/search", serveVideosController);
serveVideosRouter.get("/", serveVideosService);

module.exports = serveVideosRouter;