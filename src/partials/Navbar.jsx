import React from 'react';
import { Link } from 'react-router-dom';

const button=''

const Navbar = () => {
    return (
        <nav className="bg-gray-100 text-black p-2">
        <div className="container mx-auto flex justify-between items-center">

        <div className="flex items-center space-x-2">
            <img src="logo.png" alt="Logo" className="h-auto w-16"/>
            <span className="font-bold text-xl">Let's Eat</span>
          </div>

          <div className="flex space-x-4 items-center">
            <Link to="/signup" className="hover:text-gray-500 bg-gray-300 p-1 rounded-lg">Signup</Link>
            <Link to="/login" className="hover:text-gray-500 bg-gray-300 p-1 rounded-lg">Login</Link>
            <Link to="/register_restaurant" className="hover:text-gray-200 text-white bg-red-600 p-1 rounded-lg">Register A Restaurant</Link>
          </div>
        

        </div>
      </nav>
    );
};

export default Navbar;