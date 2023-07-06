import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white">
            My Website
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-4">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/weather"
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                Weather
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
