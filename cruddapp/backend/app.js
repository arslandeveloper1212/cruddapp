
const express = require("express");
const app = express();
const port = process.env.PORT || 8220;
const dotenv = require("dotenv");

const mongoose = require("mongoose");
dotenv.config ({path:"./config.env"});

require("./db/conn")
const users = require("./model/userSchema");

app.use(express.json());
app.use(require("./router.js/auth"));




app.get("/", (req,res)=>{
    res.send("hello home page")
    console.log("Home page")
})

app.listen(port, ()=>{
    console.log(`hello to the port of ${port}`)
})