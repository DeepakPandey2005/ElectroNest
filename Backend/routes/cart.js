const { addToCart, removeFromCart, getCartData } = require('../Controller/cart')
const authMiddleware = require('../middleware/auth')

const cartRouter=require('express').Router()

cartRouter.post('/add',authMiddleware,addToCart)
.post('/remove',authMiddleware,removeFromCart)
.post('/get',authMiddleware,getCartData)

module.exports=cartRouter