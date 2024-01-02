import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
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
      const response = await fetch('https://shivams.onrender.com/apoo/login', {
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
          Cookies.set('number', number);
         
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
    <div className="min-h-screen bg-gradient-to-r from-blue-400 bg-orange-200 flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-md w-97">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Username
  </label>
  <input
    type="text"
    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
    placeholder="Enter your username"
    value={number}
    onChange={(e) => setNumber(e.target.value)}
    title="Username must be 4-12 characters and can only contain letters, numbers, and underscores."
  />
</div>

        <div className="mb-4">
  <label className="block text-gray-700 text-sm font-bold mb-2">
    Password 
  </label>
  <input
    type="password"
    className="w-full border rounded-md py-2 px-3 focus:outline-none focus:border-blue-400"
    placeholder="Enter your password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    
    title="Password must contain at least 8 characters, including at least one number, one lowercase, and one uppercase letter."
  />
</div>

        {/* {errorMessage && (
          <div className="text-red-600 text-sm mb-4">{errorMessage}</div>
        )} */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Login
          </button>

          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div className=" relative my-4 text-gray-500 text-center">
              <span className="px-2 bg-gray-100 text-sm">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img
                  className="h-5 w-5"
                  src="https://www.svgrepo.com/show/512120/facebook-176.svg"
                  alt="Facebook"
                />
              </a>
            </div>
            <div>
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img
                  className="h-5 w-5"
                  src="https://www.svgrepo.com/show/513008/twitter-154.svg"
                  alt="Twitter"
                />
              </a>
            </div>
            <div>
              <a
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <img
                  className="h-6 w-6"
                  src="https://www.svgrepo.com/show/506498/google.svg"
                  alt="Google"
                />
              </a>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
);
};

export default Login;
