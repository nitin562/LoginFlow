const mongo=require('mongoose')

const userInfo=new mongo.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const modelUser=mongo.model('User_info',userInfo)
module.exports=modelUser