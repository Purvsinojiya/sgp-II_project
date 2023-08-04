import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';



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
          navigate(`/verifyOTP/${number}`);
        
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error occurred while submitting form data:', error);
    }
  };

  return (
    <div className="App">
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />

        <label htmlFor="number">Number:</label>
        <input
          type="text"
          id="number"
          name="number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          required
        /><br />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />

        {/* Use a regular submit button for form submission */}
        <button type="submit">Signup</button>
      </form>

      {/* The Link component for navigation */}
      <Link to={`/verifyOTP/${number}`} className="movie-card">
        Submit
      </Link>
    </div>
  );
};

export default Signup;