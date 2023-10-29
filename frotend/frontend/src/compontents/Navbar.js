import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import dow from './profile.png'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    console.log("the number: " + number);

    if (number === null) {
      setIsLoggin(false); // Use setIsLoggin to update the state
    } else {
      setIsLoggin(true); // Use setIsLoggin to update the state
    }
  }, []);
  
  

    
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-[#ca9b59] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl">SHIVAM</div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-4">
         
       
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/signup" className="text-white hover:text-gray-300">
            Signup
          </Link>
          <Link to="/gorder" className="text-white hover:text-gray-300">
            Orders
          </Link>
          <Link to="/cart" className="text-white hover:text-gray-300">
            Add to Cart
          </Link>
          {isLoggin ? (
            <Link to="/profile" className="text-white hover:text-gray-300 mt-1">
            <img src={dow} alt='' className='w-5 h-5'></img>
          </Link>
          ):(
          <Link to="/profile" className="text-white hover:text-gray-300">
            Profile
          </Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ca9b59]">
        <Link to="/login" className="block py-2 px-4 text-white">
            Login
            </Link>
            <Link to="/signup" className="block py-2 px-4 text-white">
            Signup
            </Link>
            <Link to="/gorder" className="block py-2 px-4 text-white">
            Orders
          </Link>
            <Link to="/cart"  className="block py-2 px-4 text-white">
            Add to Cart
            </Link>
           
          <Link to="/profile" className="block py-2 px-4 text-white">
            Profile
          </Link>
       
            
        </div>
      )}
    </nav>
  );
};

export default Navbar;
