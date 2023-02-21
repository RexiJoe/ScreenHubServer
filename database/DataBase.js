require("dotenv").config();
const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
//"mongodb://127.0.0.1:27017/screenhub"
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
})
.then(db => {
    console.log("Database Connected")
    
})
.catch(err => console.log(err))
