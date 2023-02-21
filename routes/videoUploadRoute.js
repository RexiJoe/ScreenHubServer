const express = require("express");
const videoUploadController = require("../controllers/videoUploadController");
const videoUploadRoute = express.Router();
const multer = require("multer");

videoUploadRoute.use(express.json())

const storage = multer.memoryStorage();
    const upload = multer({
        storage: storage,
        limits: {
            fields: 6,
            fieldSize: 1000000 * 1000,
            files: 2,
            parts: 10
        },
    });

videoUploadRoute.post("/", upload.fields([{name: "video", maxCount: 1},{name: "cover", maxCount: 1}]), videoUploadController)


module.exports = videoUploadRoute;