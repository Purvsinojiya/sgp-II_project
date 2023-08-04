import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function OTPVerification() {
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();
  const { number } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      otp,
    };

    try {
      const response = await fetch(`http://localhost:7000/apoo/verifyOTP/${number}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('OTP verification successful:', data.message);
        // Perform further actions after successful OTP verification
      } else {
        console.error('Failed to verify OTP');
      }
    } catch (error) {
      console.error('Error occurred while verifying OTP:', error);
    }
  };

  const sendOTP = async () => {
    console.log('Resending OTP...');

    try {
      const response = await fetch(`http://localhost:7000/apoo/sentOTP/${number}`, {
        method: 'POST',
      });

      if (response.ok) {
        const data = await response.json();
        console.log('OTP sent successfully:', data.otp);
        // Perform further actions after successfully resending OTP
      } else {
        console.error('Failed to resend OTP');
      }
    } catch (error) {
      console.error('Error occurred while resending OTP:', error);
    }
  };

  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">OTP:</label>
          <input type="text" id="otp" value={otp} onChange={(e) => setOTP(e.target.value)} />
        </div>
        <h1>Verify OTP for Number: {number}</h1>
        <button type="submit">Verify OTP</button>
      </form>
      <button onClick={sendOTP}>Resend OTP</button>
    </div>
  );
}

export default OTPVerification;
