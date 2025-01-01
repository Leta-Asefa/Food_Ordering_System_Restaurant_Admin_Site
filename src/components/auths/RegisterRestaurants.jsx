import React, { useState } from 'react';
import axios from 'axios';
import usePost from '../../constants/usePost';
import { useAuthUserContext } from '../../contexts/AuthUserContext';
import { useNavigate } from 'react-router-dom';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dpavrc7wd/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';



const RegisterRestaurants = () => {

  const { data, error, isLoading, post } = usePost()
  const [name, setName] = useState('');
  const [licenseImage, setLicenseImage] = useState(null);
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [validationError, setValidationError] = useState('')
  const { setAuthUser } = useAuthUserContext()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password === confirmPassword) {

      const response = await axios.post('http://localhost:4000/restaurant/add', { name, contact, address, licenseImage, password }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });


      if (response.data.errors) {
        const errors = response.data.errors

        for (const key in errors) {
          if (errors.hasOwnProperty(key) && errors[key] !== '') {
            alert(errors[key])
            console.log(errors[key])
            }
        }

        return;
      }
      else {
        localStorage.setItem('authuser', JSON.stringify(response.data.restaurant))
        setAuthUser(response.data.restaurant)
        navigate('/dashboard')
      }

      setValidationError('')
    } else {
      setValidationError('passwords must be the same')
    }

  };

  const handleImageChange = async (e) => {

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData);
      const imageUrl = response.data.secure_url;
      setLicenseImage(imageUrl)

    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };


  return (
    <div className=" bg-gray-500 w-full">
      <div className="bg-white py-2 px-56 w-full ">
        <h2 className="text-2xl font-bold mb-6 text-center">Register Your Restaurant</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label htmlFor="name" className="block text-sm text-gray-700">Restaurant Name</label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring focus:ring-yellow-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="license" className="block text-sm text-gray-700">Upload License</label>
            <input
              type="file"
              id="license"
              className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring focus:ring-yellow-500"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="mb-2">
            <label htmlFor="address" className="block text-sm text-gray-700">Address</label>
            <input
              type="text"
              id="address"
              className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring focus:ring-yellow-500"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="contact" className="block text-sm text-gray-700">Phone Number</label>
            <input
              type="tel"
              id="contact"
              className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring focus:ring-yellow-500"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring focus:ring-yellow-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-2">
            <label htmlFor="confirmPassword" className="block text-sm text-gray-700">Confirm Your Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-3 py-1 text-sm border rounded focus:outline-none focus:ring focus:ring-yellow-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-1 text-sm rounded hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-500"
            disabled={isLoading ? true : false}
          >
            Register
          </button>
          <div className='text-red-600 text-center'>{validationError}</div>
        </form>
      </div>
    </div>
  );
};

export default RegisterRestaurants;