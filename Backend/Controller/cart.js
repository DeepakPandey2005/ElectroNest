const { userModel } = require("../Model/user");

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = userData.cartData;

    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "Added to Cart" });
  } catch(err) {
    console.log(err)
    res.json({success:false,message:"Error"})

  }
};

const removeFromCart = async (req, res) => {
try{
    let userData=await userModel.findById(req.body.userId);
    let cartData=userData.cartData

    if(cartData[req.body.itemId]>0){
    cartData[req.body.itemId]-= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"removed from the cart"})
}catch (err){
    console.log(err)
    res.json({success:false,message:"Error"})
}

};

const getCartData = async (req, res) => {
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=userData.cartData
        res.json({success:true,cartData})
    }catch (err){
        console.log(err)
        res.json({success:false,message:"Error"})
    }
};

module.exports = { addToCart, removeFromCart, getCartData };
