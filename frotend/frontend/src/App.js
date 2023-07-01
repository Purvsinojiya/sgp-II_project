import React, { useState } from 'react';

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access the form values from the state variables
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Number:', number);
    console.log('Password:', password);
    alert('Submitted');

    // Add your logic to send the form data to the backend
    const formData = {
      name,
      email,
      number,
      password
    };

    try {
      const response = await fetch('/apoo/signup', {
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
    <div className="App">
      <h1>Signup Form</h1>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default App;
