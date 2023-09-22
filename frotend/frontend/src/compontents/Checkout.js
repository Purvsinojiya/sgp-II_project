// Checkout.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

function Checkout() {
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [pincode, setPincode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Access the form values from the state variables

    // Add your logic to send the form data to the backend
    const formData = {
      country,
      state,
      city,
      streetAddress,
      pincode,
    };

    try {
      const response = await fetch('http://localhost:7000/apoo/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response from the server
      if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        console.log('Form data successfully submitted:', data);

        // After successful form submission, navigate to the desired page
        navigate(`/payment`);
      } else {
        // Handle the case when the response status is not OK (e.g., 400 Bad Request)
        console.error('Failed to submit form data');
        const errorData = await response.json(); // Parse error response JSON if available
        console.error('Error details:', errorData);
      }
    } catch (error) {
      console.error('Error occurred while submitting form data:', error);
    }
  };
  

  return (
  
    <main className="p-9 min-h-screen flex items-center justify-center">
  <div className="w-[328px] h-full lg:w-[1025px] lg:h-full flex-shrink-0 bg-[#FCE8C9] rounded-[20px] shadow-xl ring-1 ring-slate-900/5">
    <div className="p-8">
      <div className="mb-4 w-[270px] h-[64px] lg:w-[304px] lg:h-[64px] flex-shrink-0 bg-[#f8f8f8] rounded-tr-[20px] rounded-bl-[20px] shadow-xl ring-1 ring-slate-900/5">
        <div className="text-center text-[#515050] font-sans text-[40px] leading-40 font-normal">
          Add Address
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 px-1 lg:px-[110px]">
          <label htmlFor="country" className="block text-gray-700 font-bold mb-2">
            Country
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full rounded-[5px] shadow-xl transition pl-8 focus:pl-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="mb-4 px-1 lg:px-[110px]">
          <label htmlFor="state" className="block text-gray-700 font-bold mb-2">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="w-full shadow-xl rounded-[5px] transition pl-8 focus:pl-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="mb-4 px-1 lg:px-[110px]">
          <label htmlFor="city" className="block text-gray-700 font-bold mb-2">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full shadow-xl rounded-[5px] transition pl-8 focus:pl-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-4 px-1 lg:px-[110px]">
          <div className="mb-4 lg:w-1/2">
            <label htmlFor="street" className="block text-gray-700 font-bold mb-2">
              Street Address
            </label>
            <textarea
              type="text"
              id="street"
              name="street"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
              rows="5"
              className="w-full h-[134px] shadow-xl rounded-[5px] transition pl-8 focus:pl-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
            ></textarea>
          </div>

          <div className="mb-4 lg:w-1/2">
            <label htmlFor="pin" className="block text-gray-700 font-bold mb-2">
              Pin Code
            </label>
            <input
              type="text"
              id="pin"
              name="pin"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full shadow-xl rounded-[5px] transition pl-8 focus:pl-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="flex lg:justify-end px-1 lg:px-[110px]">
          <button
            type="submit"
            className="bg-[#FBA557] hover:bg-[#fb8c24] text-white font-bold py-2 px-10 rounded shadow-xl focus:outline-none focus:ring-1 focus:ring-orange-500"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</main>

  );
}

export default Checkout;
