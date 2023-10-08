import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#8b5b2e] text-gray-300 py-6">
      <div className="container mx-auto pl-[20rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 gap-x-10">
          {/* About Us */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1 w-[16rem] mr-[-20rem]">
            <h2 className="text-lg font-semibold mb-2">About Us</h2>
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              quis lorem ut libero malesuada feugiat.
            </p>
          </div>

          {/* Other sections go here */}

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-lg font-semibold mb-2">Quick Links</h2>
            <ul className="text-sm">
              <li>
                <a href="#" className="hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1 lg:col-span-2">
            <h2 className="text-lg font-semibold mb-2 mr-4">Contact</h2>
            <p className="text-sm">Address: 1234 Street Name, City, Country</p>
            <p className="text-sm">Email: info@example.com</p>
            <p className="text-sm">Phone: +123 456 7890</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="mt-6 text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your E-Commerce Shop. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
