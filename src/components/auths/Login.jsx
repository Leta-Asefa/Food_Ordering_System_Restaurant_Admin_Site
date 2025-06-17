import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuthUserContext } from '../../contexts/AuthUserContext';

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [errorModal, setErrorModal] = useState("");
  const navigate = useNavigate();
  const { setAuthUser } = useAuthUserContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post('https://food-ordering-system-backend-xluu.onrender.com/restaurant/login', { phoneNumber, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    if (response.data.error) {
      setErrorModal(response.data.error);
      return;
    } else {
      localStorage.setItem('authuser', JSON.stringify(response.data.restaurant));
      setAuthUser(response.data.restaurant);
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Error Modal */}
      {errorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-xs w-full text-center border border-[#e7c873]">
            <div className="mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
            </div>
            <div className="text-gray-800 font-medium mb-4">{errorModal}</div>
            <button onClick={() => setErrorModal("")} className="px-4 py-2 rounded-lg bg-[#e7c873] text-white font-semibold hover:bg-[#bfa14a] transition">Close</button>
          </div>
        </div>
      )}
      {/* Left: Image & tagline */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" 
          alt="Delicious food" 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
        />
        <div className="relative z-10 p-10 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3 0 1.657 1.343 3 3 3s3-1.343 3-3c0-1.657-1.343-3-3-3zm0 0V4m0 4c-4.418 0-8 1.79-8 4v4a2 2 0 002 2h12a2 2 0 002-2v-4c0-2.21-3.582-4-8-4z" /></svg>
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-4">Welcome to Foodie Admin</h1>
          <p className="text-lg text-white/90 font-medium">Manage your restaurant, orders, and menu with ease.</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/80 to-transparent"></div>
      </div>
      {/* Right: Login form */}
      <div className="flex w-full h-full md:w-[420px] items-center justify-center bg-white">
        <div className="w-full max-w-md p-8  rounded-2xl  bg-white">
          <div className="flex flex-col items-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-yellow-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <h2 className="text-3xl font-bold text-gray-800">Admin Login</h2>
            <p className="text-gray-500 mt-1">Sign in to manage your restaurant</p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10a4 4 0 018 0v4a4 4 0 01-8 0v-4zm8 0a4 4 0 018 0v4a4 4 0 01-8 0v-4z" /></svg>
              </span>
              <input
                type="tel"
                id="phonenumber"
                placeholder="Phone Number"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-gray-800 text-lg bg-gray-50"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.104.896-2 2-2s2 .896 2 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2c0-1.104.896-2 2-2z" /></svg>
              </span>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200 text-gray-800 text-lg bg-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-lg font-semibold shadow-md transition-all duration-200"
            >
              Login
            </button>
          </form>
          <Link to='/register_restaurant'>
          <p className="mt-8 text-gray-500 text-center text-sm">Don't have an account? <span className="underline cursor-pointer text-yellow-600 hover:text-yellow-700 transition">Sign up</span></p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;