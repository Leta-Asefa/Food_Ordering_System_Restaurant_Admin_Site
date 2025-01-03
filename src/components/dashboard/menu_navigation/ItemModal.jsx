import axios from 'axios';
import React, { useState, useEffect } from 'react';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dpavrc7wd/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';



const ItemModal = ({ isOpen, onClose, onUpdate, selectedFood }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (selectedFood) {
      setFormData(selectedFood);
    }
  }, [selectedFood]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleNestedChange = (e, field) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [field]: {
        ...formData[field],
        [name]: value,
      },
    });
  };

  const handleUpdate = async () => {

    try {
      const response = await axios.put(`http://localhost:4000/item/${formData._id}`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log(response)

      if (response.data.message) {
        onUpdate(formData);
        onClose();
      }

    } catch (error) {
      console.error('Error updating status:', error);
    }

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

  if (!isOpen) return null;
  if (!selectedFood) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">

      <div className="relative bg-white rounded-lg shadow-lg h-screen overflow-y-scroll">

        <button
          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
          onClick={onClose}
        >
          &times;
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Edit Food Details</h2>

          <div className=" w-28 mx-auto ">

            <img src={formData.image ? formData.image : 'logoplaceholder.svg'} alt="Restaurant" className="mt-2 w-20 mx-auto h-auto hover:opacity-50 rounded-lg" onClick={() => document.getElementById('image').click()} />

            <label className=" text-gray-700 text-xs mb-2 " htmlFor="image">
              Update Menu Image
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

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 no-spinner"
                onWheel={(e) => e.target.blur()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Calories</label>
              <input
                type="number"
                name="calories"
                value={formData.calories || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 no-spinner"
                onWheel={(e) => e.target.blur()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Preparation Time</label>
              <input
                type="text"
                name="preparationTime"
                value={formData.preparationTime || ''}
                onChange={handleChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Nutritional Information</label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <input
                    type="number"
                    name="protein"
                    value={formData.nutritionalInformation?.protein || ''}
                    onChange={(e) => handleNestedChange(e, 'nutritionalInformation')}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 no-spinner"
                    placeholder="Protein"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="totalCarbohydrates"
                    value={formData.nutritionalInformation?.totalCarbohydrates || ''}
                    onChange={(e) => handleNestedChange(e, 'nutritionalInformation')}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 no-spinner"
                    placeholder="Carbohydrates"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="totalFat"
                    value={formData.nutritionalInformation?.totalFat || ''}
                    onChange={(e) => handleNestedChange(e, 'nutritionalInformation')}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 no-spinner"
                    placeholder="Fat"
                    onWheel={(e) => e.target.blur()}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Allergens</label>
              <input
                type="text"
                name="allergensInformation"
                value={formData.allergensInformation?.join(', ') || ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    allergensInformation: e.target.value.split(',').map((item) => item.trim()),
                  })
                }
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fasting Suitable</label>
              <input
                type="checkbox"
                name="isFasting"
                checked={formData.isFasting || false}
                onChange={handleChange}
                className="mt-1"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
            >
              Update
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default ItemModal;
