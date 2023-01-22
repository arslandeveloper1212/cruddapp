const mongoose = require("mongoose");
mongoose.set("strictQuery", true);


const DB = process.env.Database;
mongoose.connect(DB,{
    useNewUrlParser: true,
}).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log("connection failed")
})