import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [redirectTo, setRedirectTo] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access the form values from the state variables
    const formData = {
      number,
      password,
    };

    try {
      const response = await fetch('http://localhost:7000/apoo/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log(data.token);
        localStorage.setItem('adminAuthtoken',data.token);
        if (data.redirectTo) {
          // Set the redirection URL in state
          setRedirectTo(data.redirectTo);
        } else {
          console.log('Form data successfully submitted');
        }
      } else {
        if (response.ok) {
          console.log('Form data successfully submitted');
          navigate(`/`);
        }
      }
    } catch (error) {
      console.error('Error occurred while submitting form data:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  // Use useEffect to perform the redirection when redirectTo changes
  useEffect(() => {
    if (redirectTo) {
      // Redirect to the specified URL
      window.location.href = redirectTo;
    }
  }, [redirectTo]);

  return (
    <div>
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
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
