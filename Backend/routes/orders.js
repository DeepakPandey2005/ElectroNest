const { placeOrder, verifyOrder,userOrders, listOrders, updateStatus } = require('../Controller/orders')
const authMiddleware = require('../middleware/auth')

const orderRouter=require('express').Router()

orderRouter.post('/place',authMiddleware,placeOrder)
.post('/verify',verifyOrder)
.post('/userorders',authMiddleware,userOrders)
.get('/list',listOrders)
.post('/status',updateStatus)
module.exports=orderRouter