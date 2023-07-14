import React, { useState } from 'react';


function OTPVerification() {
  const [otp, setOTP] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
        const formData = {
          otp
        };
    
        try {
          const response = await fetch('http://localhost:7000/apoo/verifyOTP', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
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
  return (
    <div>
      <h2>OTP Verification</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="otp">OTP:</label>
          <input type="text" id="otp" value={otp} onChange={(e) => setOTP(e.target.value)} />
        </div>
        <button type="submit">S</button>
      </form>
      
    </div>
  );
}

export default OTPVerification;
