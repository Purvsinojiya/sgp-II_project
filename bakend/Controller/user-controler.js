const express = require('express');
const app = express();
const Signup = require('../model/Singup.js');
const Login = require('../model/Login.js');
const verification = require('../model/verification.js');
const bcrypt = require('bcryptjs');
const OTPGenerator = require('otp-generator');
const Product = require('../model/Product.js');
const twilio = require('twilio');
const axios = require('axios');
const stripeSecretKey = 'sk_test_51Mr40CSGOCO7N9Qbb26Bhmc4fNAWLnXUBMbLXeX9jjGeYhkYXs0Quu5LjTBrkt7JoiV4i0OHc2FZ728lVIvQel1S00ibqRvTzv'; // Replace with your actual Stripe secret key
const stripe = require('stripe')(stripeSecretKey);
const jwt = require('jsonwebtoken'); 
const jwtKey="jwt";



 // Replace with your Twilio phone number

const fast2sms = require('fast2sms');
const { Types } = require('mongoose');

const signup = async (req, res, next) => {
  const { name, email, number, password } = req.body;
  
  if (!name || !email || !password || !number) {
  return res.status(400).json({ message: 'Please provide all the required fields' });
  }
  
  const otp = OTPGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await Signup.create({ name, email, password: hashedPassword, number, otp });
  
  console.log('User OTP:', user.otp);
  
  // Save the user data in the database using the appropriate method provided by your ORM or model library
  
  // Assuming you're using Mongoose
  await user.save();
  
  const apiKey = 'PHbVJxYBwlMFOAZ2DGifzr39y4pCLQu8ojn6gSRIUastKThWvXW3AJGXSfbKZowkxzitOqvsTIpBy9D6'; // Replace with your Fast2Sms API key
  
  try {
  const response = await fast2sms.send({
  authorization: apiKey,
  message:otp,
  numbers: number,
  });
  
  console.log('SMS Response:', response);
  
  if (response.return === true && response.status === 'success') {
    console.log('OTP sent successfully');
  } else {
    if (response.message === undefined) {
      throw new Error('Undefined error occurred while sending OTP');
    } else {
      throw new Error(response.message);
    }
  }
  } catch (error) {
  console.error('Error occurred while sending OTP:', error.message);
  return res.status(500).json({ message: 'Error sending OTP' });
  }
  };
const Products = async(req, res, next) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    return res.status(500).json({ error: 'Error fetching product' });
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
  const number=req.params.number;
  console.log(number)
  const { otp } = req.body;

console.log(number);
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
  const number = req.params.number;
  console.log(number);

  try {
    const otp = OTPGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    // Update the user's OTP in the database
    const updatedUser = await Signup.findOneAndUpdate(
      { number: number }, // Filter to find the user based on the phone number
      { otp }, // Update the user's OTP
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('New OTP generated:', otp);

    // Send OTP via SMS using FastSms2 API
    const apiKey = 'YOUR_FASTSMS2_API_KEY'; // Replace with your FastSms2 API key
    const fastSms2 = new FastSms2(apiKey);

    const smsResponse = await fastSms2.sendMessage({
      to: number,
      text: `Your OTP is: ${otp}`,
    });

    if (!smsResponse.success) {
      console.error('Error occurred while sending OTP:', smsResponse.error);
      return res.status(500).json({ message: 'Error sending OTP' });
    }

    // Send the OTP as the response along with the param value
    res.status(200).json({ message: 'OTP sent successfully', otp });
  } catch (error) {
    console.error('Error occurred while sending OTP:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
 // Import the jsonwebtoken library

 const login = async (req, res, next) => {
  const jwtSecret = "your"; // Replace with your own secret key
  console.log('Login request received');
  const { number, password } = req.body; // Assuming "name" is used for username

  if (!number || !password) {
    return res.status(400).json({ message: 'Please provide the name and password' });
  }

  try {
    if (number === '9925437458' && password === 'purv123') {
      // If number and password match, consider it an admin login
      // Send a JSON response with the redirection URL
      return res.status(200).json({ redirectTo: '/admin-dashboard' }); // Change '/admin-dashboard' to your actual admin dashboard route
    }

    // If the name and password do not match admin credentials, continue with regular user login
    const user = await Signup.findOne({ number }, '-otp'); // Exclude the otp field from the query

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

  

    const loginData = new Login({
      number,
      password, // Do not store the plain password; this is for demonstration purposes only
      userId: user._id,
    });

    await loginData.save();

    // Send the token in the JSON response to the frontend for regular users
    return res.status(201).json({message: 'Payment completed successfully!' });
  } catch (err) {
    console.error('Error occurred during login:', err);
    return next(err);
  }
};

  function verificationToken(req, res, next) {
    const beartoken = req.headers['authorization'];

    if (typeof beartoken !== 'undefined') {
        const bearer = beartoken.split(' ');
        req.token = bearer[1];

        jwt.verify(req.token,"token", (err, authData) => {
            if (err) {
                console.log('Token:', req.token); // Print the token
                res.sendStatus(403); // Return a forbidden status
            } else {
                // Store the token in a server-side variable or session if needed
                // For example, store the verified data
              console.log('Token:');
                next();
            }
        });
    } else {
        res.sendStatus(401); // Return an unauthorized status
    }
}


// Middleware function to verify the user's r




const verifylogin = async (req, res) => {
  res.send("hi");
}
const stripes = async (req, res, next) => {
  const { paymentMethodId } = req.body;

  try {
    // Create a payment intent using the payment method ID
    const paymentIntent = await stripe.paymentIntents.create({
      payment_method: paymentMethodId,
      amount: 1000, // Replace with the actual amount to charge (in cents or smallest currency unit)
      currency: 'usd', // Replace with your preferred currency
      confirm: true,
    });

    // Handle successful payment or error responses
    // You can customize the response as needed
    res.status(200).json({ message: 'Payment completed successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = { signup, verifyOTP, login, sentOTP,getAllMovies,Products,stripes,verifylogin,verificationToken};
