const express = require("express");
const cors = require("cors");
const RegisterRoute = require("./routes/RegisterRoute.js");
const LoginRoute = require("./routes/LoginRoute.js");
const VerifySessionRoute = require("./routes/VerifySessionRoute.js");
const videoUploadRoute = require("./routes/videoUploadRoute.js");
const coverStreamRoute = require("./routes/coverStreamroute.js");
const serveVideosRouter = require("./routes/serveVideosRoute.js");
const getVideoInfoRoute = require("./routes/getVideoInfoRoute.js");
const videoStreamRoute = require("./routes/videoStreamRoute.js");
const app = express();

require("./database/DataBase.js");
app.use(cors());
app.use("/register", RegisterRoute);
app.use("/login", LoginRoute);
app.use("/verify/session", VerifySessionRoute);
app.use("/upload", videoUploadRoute);
app.use("/cover", coverStreamRoute);
app.use("/list", serveVideosRouter);
app.use("/getvideoinfo", getVideoInfoRoute);
app.use("/video", videoStreamRoute);

const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
    console.log(`The server is listening on port ${PORT}`);
});

module.exports = app;
