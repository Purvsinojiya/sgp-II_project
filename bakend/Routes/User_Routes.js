const express = require('express');
const userRouter = express.Router();
const { signup,verifyOTP,login,sentOTP, getAllMovies, Products,stripes} = require("../Controller/user-controler")
const Signup = require('../model/Singup.js');


 // Make sure to import the Signup model or replace it with the correct model import
const router = express.Router();

userRouter.post('/Signup',signup );

userRouter.post('/verifyOTP/:number',verifyOTP)
userRouter.post('/login',login);
userRouter.post('/payment',stripes);
userRouter.post('/sentOTP/:number',sentOTP);
userRouter.get('/home',getAllMovies)
userRouter.get('/home/:id',Products)


module.exports = userRouter;