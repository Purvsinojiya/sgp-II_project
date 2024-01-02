import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bannerImage from "./banner.jpg";
import productImage from "./sopari.jpeg";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const categories = [
    "Category 1",
    "Category 2",
    "Category 3",
    "Category 4",
    "Category 5",
    "Category 6",
    "Category 7",
    "Category 8",
  ];
  const itemsToShow = 4;
  const [startIndex, setStartIndex] = useState(0);

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - itemsToShow);
    }
  };
  const handleNextClick = () => {
    if (startIndex + itemsToShow < categories.length) {
      setStartIndex(startIndex + itemsToShow);
    }
  };
  useEffect(() => {
    


    fetch(`https://shivams.onrender.com/apoo/home`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unauthorized");
        }
        return response.json();
      })
      .then((data) => {
        setMovies(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <Navbar/>
      <div className="w-full h-[250px] flex justify-center">
        <img src={bannerImage} alt="Banner" className="object-cover w-[100%]" />
      </div>
    
      <div className="flex flex-wrap justify-center mx-12">
        {movies.map((movie) => (
          <Link to={`/${movie._id}`} key={movie._id} className="movie-card">
            <div className="w-1/4 p-6 flex justify-center h-[25rem] w-[22rem]">
              <div className="w-[220px] h-[340px] overflow-hidden bg-[#F6DCB4] rounded-[20px] shadow-md shadow-gray-400  flex flex-col justify-center items-center">
                <img
                  src={movie.imageUrl}
                  alt={movie.productName}
                  className="object-cover rounded-[20px] w-[185px] h-[136px] mt-3"
                />
                <div className="p-4">
                  <h2 className="text-gray-800 font-semibold text-lg">
                    {movie.productName}
                  </h2>
                  <p className="text-gray-600 overflow-hidden line-clamp-2">
                    {movie.productDescription}
                  </p>
                  <p className="text-gray-600 font-[700]">₹{movie.productPrice}</p>
                  <div class="flex justify-center">
                    <button className="mt-2 bg-[#FBA557] text-white px-7 py-1 rounded-[10px] shadow-xl hover:bg-[#fb8c24] focus:outline-none focus:ring-1 focus:ring-orange-500">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Footer/>
    </div>
  );
}

export default Home;
