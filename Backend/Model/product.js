const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String,required:true},
    ratings:{type:Number,required:true},
     category:{type:String,required:true}
})

exports.productModel=mongoose.models.product ||  mongoose.model('product',productSchema)

