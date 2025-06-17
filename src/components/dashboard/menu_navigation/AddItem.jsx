import React, { useState } from 'react';
import axios from 'axios';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dpavrc7wd/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';



const AddItem = () => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image: '',
        isFasting: false,
        calories: '',
        nutritionalInformation: {
            protein: '',
            totalCarbohydrates: '',
            totalFat: '',
        },
        preparationTime: '',
        allergensInformation: '',
        type: 'Food'
    });
    const { authUser } = useAuthUserContext()
    const [isUpdating, setIsUpdating] = useState(false)


    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        // If the name belongs to the nutritionalInformation object
        if (name in formData.nutritionalInformation) {
            setFormData((prevData) => ({
                ...prevData,
                nutritionalInformation: {
                    ...prevData.nutritionalInformation,
                    [name]: type === 'checkbox' ? checked : value,
                },
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: type === 'checkbox' ? checked : value,
            }));
        }

    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            const imageUrl = response.data.secure_url;
            setFormData((prevData) => ({ ...prevData, image: imageUrl }));
            alert('Image uploaded successfully!');
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true)

        const response = await axios.post(`https://food-ordering-system-backend-xluu.onrender.com/item/add`, { ...formData, restaurantId: authUser._id }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });

        
        if(response.statusText==='Created'){

           setFormData({
            name: '',
            price: '',
            description: '',
            image: '',
            isFasting: false,
            calories: '',
            nutritionalInformation: {
                protein: '',
                totalCarbohydrates: '',
                totalFat: '',
            },
            preparationTime: '',
            allergensInformation: '',
            type: 'Food'
        });
            
            setIsUpdating(false)
        }



    };

    return (
        <div className="px-6 py-3 w-full mx-auto bg-white rounded-lg">
            <h1 className="text-2xl font-bold text-center mb-3">Add Menu Item</h1>
            <form onSubmit={handleSubmit} className="space-y-4 grid grid-cols-2 gap-5 w-full">
                <div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                    </div>

                    {/* Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Upload Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>



                    {/* Calories */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Calories</label>
                        <input
                            type="number"
                            name="calories"
                            value={formData.calories}
                            onChange={handleChange}
                            required={formData.type !== 'Catering'}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>



                </div>

                <div>

                    {/* Nutritional Information */}
                    <div className='flex flex-row gap-1'>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                            <input
                                type="number"
                                name="protein"
                                value={formData.nutritionalInformation.protein}
                                onChange={handleChange}
                                required={formData.type !== 'Catering'}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Carbohydrates (g)</label>
                            <input
                                type="number"
                                name="totalCarbohydrates"
                                value={formData.nutritionalInformation.totalCarbohydrates}
                                onChange={handleChange}
                                required={formData.type !== 'Catering'}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Fat (g)</label>
                            <input
                                type="number"
                                name="totalFat"
                                value={formData.nutritionalInformation.totalFat}
                                onChange={handleChange}
                                required={formData.type !== 'Catering'}
                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                    </div>

                    {/* Preparation Time */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preparation Time</label>
                        <input
                            type="text"
                            name="preparationTime"
                            value={formData.preparationTime}
                            onChange={handleChange}
                            required={formData.type !== 'Catering'}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    {/* Allergens */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Allergens (comma-separated)</label>
                        <input
                            type="text"
                            name="allergensInformation"
                            value={formData.allergensInformation}
                            onChange={handleChange}
                            required={formData.type !== 'Catering'}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className='my-2'>
                        <label htmlFor="type">Select Item Type</label>
                        <select
                            name="type"
                            value={formData.type} // Controlled value
                            onChange={handleChange} // Update state on change
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="Food">Food</option>
                            <option value="Drink">Drink</option>
                            <option value="Catering">Catering Package</option>
                        </select>
                    </div>

                    {/* Fasting */}
                    <div className="flex items-center my-2">
                        <input
                            type="checkbox"
                            name="isFasting"
                            checked={formData.isFasting}
                            onChange={handleChange}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <label className="ml-2 text-sm font-medium text-gray-700">Suitable for Fasting</label>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            {isUpdating ? 'Submitting...' : 'Submit Item'}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
};

export default AddItem;
