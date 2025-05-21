import React from 'react';
import { Link } from 'react-router-dom';

const button=''

const Navbar = () => {
    return (
        <nav className="bg-white/80 backdrop-blur border-b border-[#e7c873] shadow-sm sticky top-0 z-30">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center h-20">
                {/* Logo and Brand */}
                <div className="flex items-center space-x-3">
                    <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain rounded-full border-2 border-[#e7c873] shadow" />
                    <span className="font-extrabold text-2xl tracking-wide text-gray-900" style={{fontFamily: 'serif'}}>Let's Eat</span>
                </div>
                {/* Navigation Links */}
                <div className="flex space-x-3 items-center">
                    <Link to="/login" className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-[#bfa14a] hover:bg-[#faf7f2] transition border border-transparent hover:border-[#e7c873]">Login</Link>
                    <Link to="/register_restaurant" className="px-4 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-[#bfa14a] to-[#e7c873] shadow hover:from-[#e7c873] hover:to-[#bfa14a] transition border border-[#e7c873]">Register A Restaurant</Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;