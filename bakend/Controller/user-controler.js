const express = require('express');
const app = express();
const Singup = require('../model/Singup.js');
const bcrypt = require('bcryptjs');
const OTPGenerator = require('otp-generator');

const signup = async (req, res, next) => {
  console.log('Signup request received');
  const { name, email, number, password } = req.body;

  if (!name || !email || !password || !number) {
    return res.status(400).json({ message: 'Please provide all the required fields' });
  }

  try {
    const otp = OTPGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    // In place of sending OTP via SMS, you can implement your own logic here to deliver the OTP to the user.
    // For example, you can send it via email, push notification, or any other preferred communication method.

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await Singup.create({ name, email, password: hashedPassword, number, otp });

    console.log('User created:', user);
    console.log('User OTP:', user.otp); // Display the user's OTP in the console

    return res.status(200).json({ message: 'Signup successful', otp });
  } catch (err) {
    console.error('Error occurred during signup:', err);
    return next(err);
  }
};



const verifyOTP = async (req, res, next) => {
  const { email, otp } = req.body;
 

  if (!email || !otp) {
    return res.status(400).json({ message: 'Please provide email and OTP' });
  }

  try {
    const user = await Singup.findOne({ email, otp });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    console.log('User OTP:',user.otp);
    console.log('Input OTP:', otp);
  

    if (user.otp !== otp) {  // Corrected the field name here from `user.otp` to `user.otpValue`
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    // OTP verification successful
    // Add your further logic here (e.g., generating token, login the user, etc.)

    return res.status(200).json({ message: 'OTP verification successful' });
  } catch (err) {
    console.error('Error occurred during OTP verification:', err);
    return next(err);
  }
};

module.exports = { signup, verifyOTP };
