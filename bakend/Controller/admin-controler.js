const express = require('express');
const app = express();
const Signup = require('../model/Singup.js');
const Login = require('../model/Login.js');
const verification = require('../model/verification.js');
const bcrypt = require('bcryptjs');
const OTPGenerator = require('otp-generator');
const Product = require('../model/Product.js');

const addProduct = async (req, res, next) => {
    try {
      const product = new Product(req.body);
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  module.exports = {addProduct};