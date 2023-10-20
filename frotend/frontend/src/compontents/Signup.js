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
      const response = await fetch('http://localhost:7000/apoo/Signup', {
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
    <div className="bg-orange-400 min-h-screen flex items-center justify-center font-normal font-['Battambang'] text-black">
    <div className="bg-pink-50 w-[1100px] h-[503px] rounded-2xl relative grid-cols-2 md:w-1/2 md:px-16">
      <h2 className="left-[120px] top-[30px] absolute text-stone-900 text-[30px]">
        Create a new account
      </h2>

      <div className="rounded-2xl absolute flex flex-col left-[130px] top-[100px] flex-wrap p-px">
        <input
          className="p-3"
          type="text"
          placeholder="Full name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-5 p-3"
        />

        <input
          type="number"
          placeholder="Phone no"
          id="phone"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="mt-5 p-3"
        />

        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-5 p-3"
        />
        <button
          type="submit"
          onClick={handleSubmit}
          className="mt-5 bg-[#FFD19B] border-slate-950 py-2 px-4 rounded-full text-bold"
        >
          Signup
        </button>
      </div>

      <div className="left-[530px] right-[26px] bottom-[20px] top-[60px] absolute rounded-1x1">
        <img src={logo} className="w-[500px] h-[350px] sm : block" />
      </div>
    </div>
  </div>
  );
};

export default Signup;