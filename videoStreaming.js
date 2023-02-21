const express = require("express");
const cors = require("cors");
const videoStreamRoute = require("./routes/videoStreamRoute.js");
const app = express();

app.use(cors());
app.use("/video", videoStreamRoute);

const PORT = process.env.PORT || 3010;
app.listen(PORT, ()=>{
    console.log(`Video Streaming is listening on port: ${PORT}`);
});