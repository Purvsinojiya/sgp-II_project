import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-700  text-white py-6">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {/* About Us */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-lg font-semibold text-white mb-2">About Us</h2>
            <p className="text-sm text-gray-400">
              We provide exceptional services to meet your needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-lg font-semibold text-white mb-2">Quick Links</h2>
            <ul className="text-sm">
              <li>
                <a href="/" className="hover:text-[#fb8c24] text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#fb8c24] text-gray-400">
                  Products
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-[#fb8c24] text-gray-400">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-lg font-semibold text-white mb-2">Contact</h2>
            <p className="text-sm text-gray-400">Address: 1234 Street Name, City, Country</p>
            <p className="text-sm text-gray-400">Email: info@example.com</p>
            <p className="text-sm text-gray-400">Phone: +123 456 7890</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-4 md:mt-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your E-Commerce Shop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
// jgjjgj