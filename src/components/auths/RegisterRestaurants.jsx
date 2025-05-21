import React, { useState } from 'react';
import axios from 'axios';
import usePost from '../../constants/usePost';
import { useAuthUserContext } from '../../contexts/AuthUserContext';
import { useNavigate } from 'react-router-dom';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dpavrc7wd/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

const RegisterRestaurants = () => {
  const { data, error, isLoading, post } = usePost();
  const [name, setName] = useState('');
  const [licenseImage, setLicenseImage] = useState(null);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const { setAuthUser } = useAuthUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (name.length > 20) {
      setValidationError('Restaurant name must be at most 20 characters.');
      return;
    }
    if (address.length > 20) {
      setValidationError('Address must be at most 20 characters.');
      return;
    }
    if (!/^0[79][0-9]{8}$/.test(contact)) {
      setValidationError('Phone number must start with 09 or 07 and be exactly 10 digits.');
      return;
    }
    if (password.length < 8) {
      setValidationError('Password must be at least 8 characters.');
      return;
    }
    if (password !== confirmPassword) {
      setValidationError('Passwords must match.');
      return;
    }

    const response = await axios.post(
      'http://localhost:4000/restaurant/add',
      { name,contact, address, licenseImage, password },
      {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      }
    );

    if (response.data.errors) {
      const errors = response.data.errors;

      for (const key in errors) {
        if (errors.hasOwnProperty(key) && errors[key] !== '') {
          alert(errors[key]);
          console.log(errors[key]);
        }
      }

      return;
    } else {
      localStorage.setItem('authuser', JSON.stringify(response.data.restaurant));
      setAuthUser(response.data.restaurant);
      navigate('/dashboard');
    }

    setValidationError('');
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      const imageUrl = response.data.secure_url;
      setLicenseImage(imageUrl);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left: Image & tagline */}
      <div className="hidden md:flex flex-1 flex-col items-center justify-center relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80" 
          alt="Delicious food" 
          className="absolute inset-0 w-full h-full object-cover opacity-80" 
        />
        <div className="relative z-10 p-10 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-6 h-16 w-16 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="7" width="16" height="10" rx="2" stroke="#bfa14a" strokeWidth="2" fill="none" /><path d="M8 7V5a4 4 0 018 0v2" stroke="#bfa14a" strokeWidth="2" fill="none" /></svg>
          <h1 className="text-4xl font-extrabold text-white drop-shadow-lg mb-4">Register Your Restaurant</h1>
          <p className="text-lg text-white/90 font-medium">Join our platform and grow your business.</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/80 to-transparent"></div>
      </div>
      {/* Right: Register form */}
      <div className="flex w-full md:w-[420px] items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 rounded-2xl shadow-2xl bg-white">
          <div className="flex flex-col items-center mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-yellow-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="4" y="7" width="16" height="10" rx="2" stroke="#bfa14a" strokeWidth="2" fill="none" /><path d="M8 7V5a4 4 0 018 0v2" stroke="#bfa14a" strokeWidth="2" fill="none" /></svg>
            <h2 className="text-3xl font-bold text-gray-800">Restaurant Registration</h2>
            <p className="text-gray-500 mt-1">Create your restaurant admin account</p>
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="text"
              id="name"
              placeholder="Restaurant Name"
              maxLength={20}
              className="w-full px-4 py-3 rounded-lg border border-[#e7c873] focus:border-[#bfa14a] focus:ring-2 focus:ring-[#e7c873] bg-[#faf7f2] text-gray-900 placeholder-gray-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label className="block w-full">
              <span className="text-sm text-gray-700 mb-1">Upload License</span>
              <input
                type="file"
                id="license"
                className="w-full px-4 py-2 rounded-lg border border-[#e7c873] focus:border-[#bfa14a] focus:ring-2 focus:ring-[#e7c873] bg-[#faf7f2] text-gray-900 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#e7c873] file:text-white hover:file:bg-[#bfa14a] transition"
                onChange={handleImageChange}
                required
              />
            </label>
            <input
              type="text"
              id="address"
              placeholder="Address"
              maxLength={20}
              className="w-full px-4 py-3 rounded-lg border border-[#e7c873] focus:border-[#bfa14a] focus:ring-2 focus:ring-[#e7c873] bg-[#faf7f2] text-gray-900 placeholder-gray-400 transition"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input
              type="tel"
              id="contact"
              placeholder="Phone Number"
              pattern="0[79][0-9]{8}"
              maxLength={10}
              className="w-full px-4 py-3 rounded-lg border border-[#e7c873] focus:border-[#bfa14a] focus:ring-2 focus:ring-[#e7c873] bg-[#faf7f2] text-gray-900 placeholder-gray-400 transition"
              value={contact}
              onChange={e => {
                // Only allow numbers
                const val = e.target.value.replace(/[^0-9]/g, '');
                setContact(val);
              }}
              required
            />
            <input
              type="password"
              id="password"
              placeholder="Password (min 8 chars)"
              minLength={8}
              className="w-full px-4 py-3 rounded-lg border border-[#e7c873] focus:border-[#bfa14a] focus:ring-2 focus:ring-[#e7c873] bg-[#faf7f2] text-gray-900 placeholder-gray-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              minLength={8}
              className="w-full px-4 py-3 rounded-lg border border-[#e7c873] focus:border-[#bfa14a] focus:ring-2 focus:ring-[#e7c873] bg-[#faf7f2] text-gray-900 placeholder-gray-400 transition"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-[#bfa14a] to-[#e7c873] text-white text-lg font-semibold shadow-md hover:from-[#e7c873] hover:to-[#bfa14a] transition-all duration-200 mt-2"
              disabled={isLoading ? true : false}
            >
              {isLoading ? 'Registering...' : 'Register'}
            </button>
            {validationError && <div className='text-red-600 text-center text-sm'>{validationError}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterRestaurants;