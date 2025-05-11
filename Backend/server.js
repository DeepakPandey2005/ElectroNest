const express=require("express")
require('dotenv').config()
const cors=require('cors')
const router = require("./routes/product")
const app=express()
const port=process.env.PORT
const connectDb=require('./Config/db')
const userRouter = require("./routes/user")
const cartRouter = require("./routes/cart")
const orderRouter = require("./routes/orders")
const path=require('path')

// middlewares 
app.use(express.json())
app.use(cors())

// connection to the db 
connectDb(0)

// routes 
app.use("/images",express.static(process.env.FILES_FOLDER))
app.use('/api/user',userRouter)
app.use('/api/product',router)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)

// server running status 
app.get('/health',(req,res)=>{
    res.send("All good ")
})

app.listen(port,()=>{
    console.log("server is running on the port http://localhost:"+port);
})