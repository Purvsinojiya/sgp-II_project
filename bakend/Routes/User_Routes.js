const express = require('express');
const userRouter = express.Router();
const { signup,verifyOTP,login} = require("../Controller/user-controler")

userRouter.post('/signup',signup );

userRouter.post('/verifyOTP',verifyOTP);
userRouter.post('/login',login);

module.exports = userRouter;