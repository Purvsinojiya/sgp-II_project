import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch movies
    fetch('http://localhost:7000/apoo/home', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
