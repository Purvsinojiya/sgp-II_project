const express = require('express');
const app = express();
const Signup = require('../model/Singup.js');
const Login = require('../model/Login.js');
const verification = require('../model/verification.js');
const bcrypt = require('bcryptjs');
const OTPGenerator = require('otp-generator');
// const twilio = require('twilio');

// const accountSid = 'AC73d85056055c0294033c3a3021c98f9e';
// const authToken = '59feeb0e2e45c16a6fc4ec698b86f4f7';
// const client = twilio(accountSid, authToken);

const signup = async (req, res, next) => {
  console.log('Signup request received');
  const { name, email, number, password } = req.body;

  if (!name || !email || !password || !number) {
    return res.status(400).json({ message: 'Please provide all the required fields' });
  }

  try {
    const otp = OTPGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    // Send OTP via SMS using Twilio
    // const smsResponse = await client.messages.create({
    //   body: `Your OTP is for Shivam EnterPrise: ${otp}`,
    //   from: '+14178923736',
    //   to: number
    // });

    // if (!smsResponse || smsResponse.errorCode) {
    //   // Handle error if SMS sending fails
    //   console.error('Error sending SMS:', smsResponse.errorCode);
    //   return res.status(500).json({ message: 'Error sending OTP via SMS' });
    // }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await Signup.create({ name, email, password: hashedPassword, number, otp });

    console.log('User created:', user);
    console.log('User OTP:', user.otp);
    // Display the user's OTP in the console

    return res.status(200).json({ message: 'Signup successful', otp });
  } catch (err) {
    console.error('Error occurred during signup:', err);
    return next(err);
  }
};

const verifyOTP = async (req, res, next) => {
  const { number, otp } = req.body;

  if (!number || !otp) {
    return res.status(400).json({ message: 'Please provide email and OTP' });
  }

  try {
    const user = await Signup.findOne({ number,otp }).maxTimeMS(30000); // Set timeout to 30 seconds (30000 milliseconds)

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('User OTP:', user.otp);
    console.log('Input OTP:', otp);

    if (user.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }
    const verifyData = new verification({
      number,
      otp,
      userId: user._id
       // Assuming your user model has an "_id" field
    });

    await verifyData.save();

    // OTP verification successful
    // Add your further logic here (e.g., generating token, login the user, etc.)

    return res.status(200).json({ message: 'OTP verification successful' });
  } catch (err) {
    console.error('Error occurred during OTP verification:', err);
    return next(err);
  }
};



const login = async (req, res, next) => {
  console.log('Login request received');
  const { number, password } = req.body;

  if (!number || !password) {
    return res.status(400).json({ message: 'Please provide the phone number and password' });
  }

  try {
    // Find the user based on the provided phone number
    const user = await Signup.findOne({ number }, '-otp'); // Exclude the otp field from the query

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Password is correct, proceed with further logic (e.g., generate token, login user, etc.)
    
    // Store the login details in the Login model
    const loginData = new Login({
      number,
      password,
      userId: user._id // Assuming your user model has an "_id" field
    });

    await loginData.save();

    return res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    console.error('Error occurred during login:', err);
    return next(err);
  }
};







module.exports = { signup, verifyOTP, login };
