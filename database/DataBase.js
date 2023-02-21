const mongoose = require("mongoose");

const uri = "mongodb+srv://rexijoe:240499240499aA@cluster0.wkm3bnj.mongodb.net/?retryWrites=true&w=majority"
mongoose.set("strictQuery", true);
//"mongodb://127.0.0.1:27017/screenhub"
mongoose.connect(uri, {
    useNewUrlParser: true
})
.then(db => {
    console.log("Database Connected")
    
})
.catch(err => console.log(err))
