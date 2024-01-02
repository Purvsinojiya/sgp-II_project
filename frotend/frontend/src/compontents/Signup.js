import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import logo from "./download.jpeg";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access the form values from the state variables
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Number:', number);
    console.log('Password:', password);
   

    alert('Submitted');
    const userId = uuidv4();
    // Add your logic to send the form data to the backend
    const formData = {
      name,
      email,
      number,
      password,
      _id: userId
    };
  
    console.log(formData._id)
    try {
      const response = await fetch('https://shivams.onrender.com/apoo/Signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Handle the response from the server
      if (response.ok) {
        console.log('Form data successfully submitted');
        // After successful form submission, navigate to the desired page
     // Replace with your actual code to retrieve the id

       
          // If id is available, navigate to the /verifyOTP route with the id parameter
          navigate(`/Login`);
        
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error occurred while submitting form data:', error);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-300 to-orange-300 min-h-screen flex items-center justify-center font-normal font-battambang text-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">
          Create a new account
        </h2>
        <div className='p-4'>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            {/* Name Input */}
            <label className="block text-gray-700 text-sm font-bold">
              Name
            </label>
            <input
              type="text"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              placeholder="Enter your name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
  
            {/* Email Input */}
            <label className="block text-gray-700 text-sm font-bold">
              Email
            </label>
            <input
              type="email"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              placeholder="Enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
  
            {/* Phone No Input */}
            <label className="block text-gray-700 text-sm font-bold">
              Phone No
            </label>
            <input
              type="tel"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              placeholder="Enter your phone number"
              id="number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
            />
  
            {/* Password Input */}
            <label className="block text-gray-700 text-sm font-bold">
              Password
            </label>
            <input
              type="password"
              className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
              placeholder="Enter your password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            
            {/* Signup Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Signup
            </button>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;