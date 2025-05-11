const { productModel } = require("../Model/product")
const fs=require('fs')
const add=async(req,res)=>{
    const img_filename=`${req.file.filename}`

    const product=new productModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        image:img_filename,
        ratings:req.body.ratings,
        category:req.body.category

    })
try{
await product.save();
res.json({success:true,message:"product added"})    
}catch(err){
console.log(err)
res.json({success:false,message:"error"})
}
}

const list=async(req,res)=>{
    try{
        const products=await productModel.find({})
        res.json({success:true,data:products})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})}}

const remove=async(req,res)=>{
    const id=req.params.id;
    try{
        const product=productModel.findById(id)
        fs.unlink(`uploads${product.image}`,()=>{})
        await productModel.findByIdAndDelete(id);
        res.json({success:true,message:"Product removed"})
}catch(err){
    console.log(err)
    res.json({success:true,message:"Error"})
}
}

module.exports={add,list,remove}