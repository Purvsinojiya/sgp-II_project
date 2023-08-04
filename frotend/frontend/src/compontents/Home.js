import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Fetch the movie data from your backend server
    fetch('http://localhost:7000/apoo/home') // Replace this with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setMovies(data))
      .catch((error) => console.error('Error fetching movies:', error));
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-5">Home Page</h1>
    
      <div className="grid gap-4 grid-cols-2">
        {movies.map((movie) => (
          <Link to={`/${movie._id}`} key={movie._id} className="movie-card">
            <div className="shadow-md p-4 rounded-lg border border-gray-200">
              <img src={movie.imageUrl} alt={movie.title} className="w-full h-40 object-cover mb-2 rounded-lg" />
              <h2 className="text-lg font-semibold">{movie.title}</h2>
              <p className="text-gray-600">Price: ${movie.price}</p>
              <p className="text-gray-600">Description: {movie.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
