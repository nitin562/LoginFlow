
const mongoConnect=require('./db');
const express=require('express')
require('dotenv').config()
const cors=require('cors')
//establish the connection
mongoConnect(`${process.env.URL}`)
//init express server
const app=express()
app.use(cors({ origin: true, credentials: true }));
app.use(express.json()) //middleware that only parses json
//creating route files for endpoints
app.use('/api/auth',require('./Routes/Auth'))
//intial message
app.get('/',(req,res)=>{
    res.send("Hello to login flow")
})
//checking the port
app.listen(process.env.PORT,()=>{
    console.log("The server is running on http://localhost:"+process.env.PORT)
})
