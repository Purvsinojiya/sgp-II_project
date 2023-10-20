import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function Profile() {
  const [profiles, setProfiles] = useState([]);
  const [apps, setApps] = useState([]);
  const [isLoggin, setIsLoggin] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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
    console.log("the number: " + number);

    if (number === null) {
      setIsLoggin(false);
    } else {
      setIsLoggin(true);
    }

    fetch(`http://localhost:7000/apoo/profile/${number}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setProfiles(data.data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) => console.error('Error fetching user profiles:', error));

    fetch(`http://localhost:7000/apoo/add/${number}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setApps(data.data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) => console.error('Error fetching app information:', error));
  }, []);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      fetch('http://localhost:7000/apoo/uploads', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('File upload response:', data);
          // You can update the profile or do something else with the response
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  };

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
                {selectedFile && (
                  <div>
                    <p>Uploaded Photo:</p>
                    <img
                      src={URL.createObjectURL(selectedFile)}
                      alt="Uploaded Photo"
                      className="h-48 w-48"
                    />
                  </div>
                )}
              </div>
            ))
          ) : (
            <div>No Login</div>
          )}
        </div>

        {/* App information section */}
        <div>
          {isLoggin ? (
            apps.map((app) => (
              <div key={app._id} className="bg-white rounded-lg shadow-md p-4">
                <p className="text-xl font-semibold mb-2">Add information</p>
                <p>Country: {app.country}</p>
                <p>State: {app.state}</p>
                <p>City: {app.city}</p>
                <p>Street Address: {app.streetAddress}</p>
                <p>Pincode: {app.pincode}</p>
              </div>
            ))
          ) : (
            <div>No Login</div>
          )}
        </div>
      </div>

      {/* Image upload form */}
      <div className="mt-4">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload Photo</button>
      </div>
    </div>
  );
}

export default Profile;
