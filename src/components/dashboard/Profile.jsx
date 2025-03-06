import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthUserContext } from '../../contexts/AuthUserContext';
const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: { type: 'Point', coordinates: [] },
        opened: false,
        image: '',
        cuisine: '',
        priceRange: '',
        address: '',
        contact: '',
        _id: ''
    });
    const [isUpdating, setIsUpdating] = useState(false)
    const { authUser } = useAuthUserContext()

    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dpavrc7wd/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

    useEffect(() => {
        async function getProfile() {

            const response = await axios.get(`http://localhost:4000/restaurant/${authUser.contact}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            // Assuming the API response returns data in the correct format
            const { _id, name, location, opened, image, cuisine, priceRange, address, contact } = response.data;
          // Set the formData state with the fetched data
            setFormData({
                name: name || '',
                location: location || { type: 'Point', coordinates: [] },
                opened: opened || false,
                image: image || '',  // keep the image if provided by the response
                cuisine: cuisine || '',
                priceRange: priceRange || '',
                address: address || '',
                contact: contact || '',
                _id
            });
        }


        getProfile()

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            const image = response.data.secure_url;
            setFormData((prevFormData) => ({
                ...prevFormData,
                image,
            }));

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // Structure location as { type: 'Point', coordinates: [latitude, longitude] }
                const location = {
                    type: 'Point',
                    coordinates: [position.coords.longitude,position.coords.latitude ],
                };
                setFormData({
                    ...formData,
                    location, // Update the location property
                });
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true)
        const response = await axios.put(`http://localhost:4000/restaurant/update/${authUser.contact}`, formData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });
        
        
        if(response.statusText==='OK'){

            const { _id,name, location, opened, image, cuisine, priceRange, address, contact } = response.data;
    
            // Set the formData state with the fetched data
            setFormData({
                name: name || '',
                location: location || { type: 'Point', coordinates: [] },
                opened: opened || false,
                image: image || '',  // keep the image if provided by the response
                cuisine: cuisine || '',
                priceRange: priceRange || '',
                address: address || '',
                contact: contact || '',
                _id
            });
            
            setIsUpdating(false)
        }
    };
    

    return (
        <div className="w-full mx-auto mt-4 py-0 px-24 border border-gray-200 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold w-96 mx-auto text-center">Profile</h2>
            <form onSubmit={handleSubmit}>

                <div className=" w-24 mx-auto ">

                    <img src={formData.image ? formData.image : 'logoplaceholder.svg'} alt="Restaurant" className="mt-2 w-20 mx-auto h-auto hover:opacity-50 rounded-lg" onClick={() => document.getElementById('image').click()} />

                    <label className=" text-gray-700 text-xs mb-2" htmlFor="image">
                        upload profile pic
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="invisible"
                    />
                </div>

                <div className='h-0.5 w-full bg-gray-300 mb-4'></div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Restaurant Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="locatoin"
                        disabled
                        value={formData.location.coordinates.length > 0 ? formData.location.coordinates.join(', ') : ''}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <button
                        type="button"
                        onClick={handleLocationClick}
                        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Use Current Location
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Opened
                    </label>
                    <input
                        type="checkbox"
                        name="opened"
                        id="opened"
                        checked={formData.opened}
                        onChange={handleCheckboxChange}
                        className="mr-2 leading-tight"
                    />
                    <span className="text-sm">Is the restaurant open?</span>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuisine">
                        Cuisine
                    </label>
                    <input
                        type="text"
                        name="cuisine"
                        id="cuisine"
                        value={formData.cuisine}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRange">
                        Price Range
                    </label>
                    <input
                        type="text"
                        name="priceRange"
                        id="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        name="contact"
                        id="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-10 rounded focus:outline-none focus:shadow-outline"
                    >
                        {isUpdating ? 'Updating ...' : 'Update'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;
