const express = require('express');
const userRouter = express.Router();
const { signup,verifyOTP,login,sentOTP, getAllMovies} = require("../Controller/user-controler")
const Signup = require('../model/Singup.js');


 // Make sure to import the Signup model or replace it with the correct model import
const router = express.Router();

userRouter.post('/signup',signup );
userRouter.post('/verifyOTP',verifyOTP)
userRouter.post('/login',login);
userRouter.get('/sentOTP/:param',sentOTP);
userRouter.get('/home',getAllMovies)


module.exports = userRouter;