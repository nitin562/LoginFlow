const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {validationResult }=require("express-validator")
const {SignUpValidate,LoginValidate}=require("./Validation/Validate");
const modelUser= require("../Model/User");

//create router

const router = express.Router()

//creating Endpoints

//EndPoint-1: To Register, /Register
router.post("/Register", SignUpValidate, async (req, res) => {
  try {
    // if some invalid req is provided so to check their errors-
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ Success: 0, error: errors.mapped() });
    }
    //Checking email is valid to get registerd
    let client = await modelUser.findOne({ email: req.body.email });
    if (client) {
      //if already registered
      return res.json({
        Success: 0,
        error: { email: {
          msg:"Already Registered with provided Email"
        } },
      });
    }
    //otherwise
    //password hashing using bcryptjs
    const salt = await bcrypt.genSalt(10); //digits=10 default
    const HashedPass = await bcrypt.hash(req.body.password, salt); //hash the password with salt
    //create user
    const user = await modelUser.create({
      name: req.body.name,
      email: req.body.email,
      password: HashedPass,
    });
    //generate token and send using json web token
    const payload = {
      //let data to be inserted in token -
      user_id: user.id, //string
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY); //synchronous
    res.json({ Success: 1,username:req.body.name, token });
  }
   catch (error) {
    res.status(500).json({Success:0,error})  //Internal Error
   }
});

//EndPoint-2: /login
router.post('/login',LoginValidate,async(req,res)=>{
  try {
    // if some invalid req is provided so to check their errors-
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ Success: 0, error: errors.mapped() });
    }
    //checking the user is existed in database
    let client=await modelUser.findOne({email:req.body.email})
    if(!client){
      return res.json({Success:0,error:{
        email:{
          msg:'Email is not found to be registered'
        }
      }})
    }
    //after founding client, checking the password
    let checkPassword=await bcrypt.compare(req.body.password,client.password)
    if(!checkPassword){
      return res.json({ Success: 0, error:{
        password:{
          msg:"The Password is not correct"
        }}});
    }
    //after verifying the client, generate token and send
    const payload = {
      //let data to be inserted in token -
      user_id: client.id, //string
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY); //synchronous
    res.json({ Success: 1,username:client.name, token });
  } catch (error) {
      res.status(500).json({Success:0,error})  //Internal Error
  }
})
module.exports=router
