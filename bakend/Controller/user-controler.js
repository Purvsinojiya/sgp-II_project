const express = require('express');
const app = express();
const Signup = require('../model/Singup.js');
const Login = require('../model/Login.js');
const verification = require('../model/verification.js');
const bcrypt = require('bcryptjs');
const OTPGenerator = require('otp-generator');
const Product = require('../model/Product.js');




const signup = async (req, res, next) => {
  const { name, email, number, password } = req.body;

  if (!name || !email || !password || !number) {
    return res.status(400).json({ message: 'Please provide all the required fields' });
  }

  try {
    const otp = OTPGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = await Signup.create({ name, email, password: hashedPassword, number, otp });

    console.log('User OTP:', user.otp);

    // Save the user data in the database using the appropriate method provided by your ORM or model library

    // Assuming you're using Mongoose
    await user.save();
    console.log(user)

    // Set the cookie value

    return res.status(200).json({ message: 'Signup successful' });
  } catch (err) {
    console.error('Error occurred during signup:', err);
    return next(err);
  }
};

const getAllMovies = async (req, res, next) => {
  try {
    // Fetch all movies from the database
    const movies = await Product.find({});

    // If no movies are found, respond with an empty array
    if (!movies || movies.length === 0) {
      return res.json([]);
    }

    // If movies are found, respond with the array of movies
    return res.json(movies);
  } catch (err) {
    console.error('Error occurred while fetching movies:', err);
    return next(err);
  }
};


const verifyOTP = async (req, res, next) => {
  
  const { otp } = req.body;
  console.log(otp);

  if (!otp) {
    return res.status(400).json({ message: 'Please provide email and OTP' });
  }

  try {
    const user = await Signup.findOne({ otp }).maxTimeMS(30000); // Set timeout to 30 seconds (30000 milliseconds)

    if (!user) {    
      return res.status(404).json({ message: 'User not found' });
    }

   

    if (user.otp !== otp) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }
    const verifyData = new verification({
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

const sentOTP = async (req, res, next) => {
  
    const otp = OTPGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false }); // Generate a new OTP

    // Update the user's OTP in the database
    const user = await Signup.findOneAndUpdate({ otp: otp });

    console.log('New OTP generated:', otp);

    // Send OTP via SMS using Twilio or any other desired logic

    req.otp = otp; // Store the generated OTP in the request object

    // Send the OTP as the response along with the param value
    res.status(200).json({ message: 'OTP sent successfully', otp, param });
    console.log(otp);
    return res.status(500).json({ message: 'Internal server error' });
  
  } 
    






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


module.exports = { signup, verifyOTP, login, sentOTP,getAllMovies};
