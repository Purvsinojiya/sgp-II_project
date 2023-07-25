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
    <div>
      <h1>Home Page</h1>
      <div>
        {movies.map((movie) => (
          <Link to={`/${movie._id}`} key={movie._id} className="movie-card">
            <div>
              <img src={movie.imageUrl} alt={movie.title} />
              <h2>{movie.title}</h2>
              <p>Price: ${movie.price}</p>
              <p>Description: {movie.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
