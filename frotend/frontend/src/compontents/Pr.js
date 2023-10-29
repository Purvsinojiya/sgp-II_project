import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Profile_Placeholder from './Profile_Placeholder.png'

const Profile = () => {
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
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex flex-col md:flex-row w-full p-5">
      <div className="bg-white text-gray-700 p-5 rounded-lg shadow-lg text-center md:w-1/3 md:h-1/2">
      {profiles.map((profile) => (
  <div key={profile.id}>
    <img src={selectedFile ? URL.createObjectURL(selectedFile) : Profile_Placeholder} alt="Profile_Pic" className="rounded-full border-2 border-orange-300 h-48 w-48 mx-auto mb-5" />
    <ul className="text-xl font-semibold">
      <li className='p-1'>{profile.name}</li>
      <li className='p-1'>{profile.email}</li>
      <li className='p-1'>{profile.number}</li>
      {selectedFile && (
        <div>
        </div>
      )}
    </ul>
    <label className="block p-1 mt-4 text-orange-600 cursor-pointer">
      <input type="file" className="hidden" onChange={handleFileChange} />
      <span className="bg-orange-200 text-white py-2 px-4 rounded-full hover:bg-orange-300 transition duration-300">
        Upload Image
      </span>
    </label>
  </div>
))}




</div>
        {apps.map((app) => (
  <div key={app._id} className="bg-white p-5 rounded-lg shadow-lg md:ml-5 mt-5 md:mt-0 md:w-full">
    <ul>
      <h1 className="text-4xl text-center text-gray-600 font-sans font-semibold mb-5 bg-orange-100 rounded-lg">Profile</h1>
    </ul>
    <hr className="mt-2 border-t-2 border-orange-300" />
    <ul>
      <p className="text-md p-1 mt-1 font-semibold text-gray-500">Country</p>
      <p className="p-1 text-2xl font-semibold">{app.country}</p>
    </ul>
    <ul>
      <p className="text-md p-1 mt-1 font-semibold text-gray-500">State</p>
      <p className="p-1 text-2xl font-semibold">{app.state}</p>
    </ul>
    <ul>
      <p className="text-md p-1 mt-1 font-semibold text-gray-500">City</p>
      <p className="p-1 text-2xl font-semibold">{app.city}</p>
    </ul>
    <ul>
      <p className="text-md p-1 mt-1 font-semibold text-gray-500">Street Address</p>
      <p className="text-xl p-1 font-semibold">
        {app.streetAddress}
      </p>
    </ul>
    <ul>
      <p className="text-md p-1 mt-1 font-semibold text-gray-500">Pincode</p>
      <p className="p-1 text-2xl font-semibold">{app.pincode}</p>
    </ul>
  
  </div>
))}

      </div>
    </div>
  );
};

export default Profile;
