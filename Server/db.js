const mongo=require('mongoose')
require('dotenv').config()

const connectToMongoDB=async(url)=>{
    
    await mongo.connect(url)
}
module.exports=connectToMongoDB