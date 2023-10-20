import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function Profile()
 {
        const [profiles, setProfile] = useState([]);
        const [isLoggin, setIsLoggin] = useState(false);

        useEffect(() => {
          function getCookie(cookieName) {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
              const cookie = cookies[i].trim();
              if (cookie.startsWith(cookieName + '=')) {
                return decodeURIComponent(cookie.substring(cookieName.length + 1));
              }
            }
            return null; // Cookie not found
          }
      
          const number = getCookie('number');
          console.log("the number: " + number); // Separate the text and number with a space
       
          if (number === null) {
            setIsLoggin(false); // Use setIsLoggin to update the state
          } else {
            setIsLoggin(true); // Use setIsLoggin to update the state
          }
          // Fetch orders for the logged-in user
          fetch(`http://localhost:7000/apoo/profile/${number}`)
            .then((response) => response.json())
            .then((data) => {
              // Check if the 'data' property contains an array
              if (data.success && Array.isArray(data.data)) {
                setProfile(data.data);
              } else {
                console.error('Data is not an array:', data);
              }
            })
            .catch((error) => console.error('Error fetching orders:', error));
        }, []);
        return (
            <div className="bg-gray-100 min-h-screen p-4">
              <Navbar />
              <h1 className="text-3xl font-bold my-8">Profile</h1>
        
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <div>
  {isLoggin ? (
    profiles.map((profile) => (
      <div key={profile._id} className="bg-white rounded-lg shadow-md p-4">
        <p className="text-xl font-semibold mb-2">Profile Name:</p>
        <p>Profile Name: {profile.name}</p>
        <p>Profile Number: {profile.number}</p>
        <p>Profile email: {profile.email}</p>
      </div>
    ))
  ) : (
    <div>No Login</div>
  )}
</div>
              </div>
            </div>
          );
        }
        
        export default Profile;