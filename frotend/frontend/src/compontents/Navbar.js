import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
         
        <Link to="/products" className="text-white hover:text-gray-300">
            Products
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300">
            Login
          </Link>
          <Link to="/signup" className="text-white hover:text-gray-300">
            Signup
          </Link>
          <Link to="/cart" className="text-white hover:text-gray-300">
            Add to Cart
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-300">
            Profile
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#ca9b59]">
          <a href="#" className="block py-2 px-4 text-white">
            Login
          </a>
          <a href="#" className="block py-2 px-4 text-white">
            Signup
          </a>
          <a href="#" className="block py-2 px-4 text-white">
            Add to Cart
          </a>
          <a href="#" className="block py-2 px-4 text-white">
            Profile
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
