const { loginUser, registerUser } = require('../Controller/user')

const userRouter=require('express').Router()

userRouter.post('/login',loginUser)
.post('/register',registerUser)

module.exports=userRouter