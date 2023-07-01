const express = require('express');
const userRouter = express.Router();
const { signup,verifyOTP } = require("../Controller/user-controler")

userRouter.post('/signup',signup );

userRouter.post('/verifyOTP',verifyOTP);

module.exports = userRouter;