const mongoose=require('mongoose')
require('dotenv').config()

const connectDb=async ()=>{
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('db is connected')
    })
}

module.exports=connectDb