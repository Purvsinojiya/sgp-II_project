import React, { useState, useEffect } from 'react';

function DisplayUser() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('adminAuthtoken'); 
    fetch('http://localhost:7000/admin/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mx-auto mt-8">
    <h1 className="flex text-2xl font-semibold mb-4 justify-center">User Profiles</h1>
    <table className="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Name</th>
          <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Email</th>
          <th className="px-4 py-2 bg-[#FCE8C9] opacity-75">Number</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={user.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
            <td className="px-4 py-2 text-center">{user.name}</td>
            <td className="px-4 py-2 text-center">{user.email}</td>
            <td className="px-4 py-2 text-center">{user.number}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
}


export default DisplayUser;
