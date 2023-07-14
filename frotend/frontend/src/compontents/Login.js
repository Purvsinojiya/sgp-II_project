import React, { useState } from 'react';

function Login() {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access the form values from the state variables
   
    console.log('Number:', number);
    console.log('Password:', password);
    alert('Submitted');

    // Add your logic to send the form data to the backend
    const formData = {
      number,
      password
    };

    try {
      const response = await fetch('http://localhost:7000/apoo/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Handle the response from the server
      if (response.ok) {
        console.log('Form data successfully submitted');
      } else {
        console.error('Failed to submit form data');
      }
    } catch (error) {
      console.error('Error occurred while submitting form data:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="number">Number:</label>
          <input type="text" id="number" value={number} onChange={(e) => setNumber(e.target.value)} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
