const express = require('express');
const userRouter = express.Router();
const { signup,verifyOTP,login,sentOTP, getAllMovies, Products,stripes,verifylogin,verificationToken, Addres} = require("../Controller/user-controler")




 // Make sure to import the Signup model or replace it with the correct model import

userRouter.post('/Signup',signup );
userRouter.post('/verifyOTP/:number',verifyOTP)
userRouter.post('/login',login);
userRouter.get('/verifylogin',verifylogin);
userRouter.post('/payment',stripes);
userRouter.post('/sentOTP/:number',sentOTP);
userRouter.get('/home',getAllMovies)
userRouter.post('/checkout',Addres);
userRouter.get('/home/:id',Products)



module.exports = userRouter;