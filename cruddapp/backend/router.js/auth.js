const express = require("express");
const user = require("../model/userSchema");
const router = express.Router();
require("../db/conn")
const users = require("../model/userSchema");


router.get("/", (req, res) => {
    res.send("Hello router page");
})

// register
router.post("/register", async (req, res) => {
    console.log(req.body);
    const { name, email, age, mobile, work, address, desc } = req.body;

    if (!name || !email || !age || !mobile || !work || !address || !desc) {
        res.status(422).json({ err: "Please fill the form correctly" });
    }
    try {

        const isequal = await users.findOne({ email: email });
        if (isequal) {
            res.status(422).json({ message: "Email already exists" })
        } else {
            const newuser = await new user({ name, email, age, mobile, work, address, desc });
            newuser.save();
            if (newuser) {
                res.status(201).json({ message: "user created successfully" });
            } else {
                res.status(422).json({ err: "user not registered " })
            }
        }

    } catch (err) {
        console.log(err);
    }
})

    //get method

    // read data from user
    router.get("/userdata", async (req, res) => {
        console.log(req.body)
        try {
            const getuser = await users.find();
            res.status(201).json(getuser)
            console.log(getuser);
        } catch (err) {
            res.status(404).json(err);
        }
    })

//userindividual data


router.get("/userdata/:id", async (req,res)=>{
    try{
         
         const {id}=req.params;
         const userindividual = await users.findById({_id:id});
         console.log(userindividual);
         res.status(201).json(userindividual);

    }catch(err){
        console.log(err);
        res.status(422).json(err);
    }
})

//udate user

router.patch("/updatedata/:id",async(req,res)=>{
  try{
    const {id} = req.params;
    const updateuser = await users.findByIdAndUpdate(id,req.body,{
     new: true,
    });
    console.log(updateuser);
    res.status(201).json(updateuser);
  }catch(err){
    console.log(err);
    res.status(422).json(err);
  }
})


//delete user data

router.get("/deleteuser/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const deleteuser = await users.findByIdAndDelete({_id:id});
        console.log(deleteuser);
        res.status(201).json({message: "deleted successfully"});
    }catch(err){
        res.status(422).json(err);
    }
})




module.exports = router;