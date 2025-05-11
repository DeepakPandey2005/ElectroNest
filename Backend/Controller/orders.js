const { Stripe } = require("stripe");
const orderModel = require("../Model/orders");
const { userModel } = require("../Model/user");

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const frontendUrl="http://localhost:5173"
//placeing user order for frontend 
const placeOrder= async(req,res)=>{
try{
    const newOrder=new orderModel({
        userId:req.body.userId,
        items:req.body.items,
        amount:req.body.amount,
        address:req.body.address
    })
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});
  
    const line_items=req.body.items.map((item)=>({
        price_data:{
            currency:"inr",
            product_data:{
                name:item.name
            },
            unit_amount:item.price*100
        },
        quantity:item.quantity
    }))

    line_items.push({
        price_data:{
            currency:'inr',
            product_data:{
                name:"Delivery Charges"
            },
            unit_amount:99*100
        },
        quantity:1
    })

     const session= await stripe.checkout.sessions.create({
        line_items:line_items,
        mode:'payment',
        success_url:`${frontendUrl}/verify?success=true&orderId=${newOrder._id}`,
        cancel_url:`${frontendUrl}/verify?success=false&orderId=${newOrder._id}`
     })
     res.json({success:true,session_url:session.url})

}catch(err){
  console.log(err);
  res.json({success:false,message:"Error"})
}}

const verifyOrder=async (req,res)=>{
const {orderId,success}=req.body
try{
    if(success=="true"){
        await userModel.findByIdAndUpdate(orderId,{payment:true});
        res.json({success:true,message:"paid"})
    }else{
        await orderModel.findByIdAndDelete(orderId);
        res.json({success:false,message:"not paid"})
    }

}catch(err){
    console.log(err)
    res.json({success:false,message:"Not paid"})

}
}

const userOrders=async(req,res)=>{
    try{
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }

}
const listOrders=async (req,res)=>{
    try{
        const orders=await orderModel.find({})
        res.json({success:true,data:orders})


    }catch(err){
      console.log(err)
      res.json({success:false,message:"error"})
    }
}

const updateStatus=async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Order Updated"})

    }catch(err){
        console.log(err)
        res.json({success:false,message:"error"})
    }


}
module.exports={placeOrder,verifyOrder,userOrders,listOrders,updateStatus}