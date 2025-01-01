import React, { useState, useEffect } from 'react';

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

  const handleUpdate = () => {
    onUpdate(formData);
    onClose();
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
          <div className="grid grid-cols-1 gap-4">
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
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Protein"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="totalCarbohydrates"
                    value={formData.nutritionalInformation?.totalCarbohydrates || ''}
                    onChange={(e) => handleNestedChange(e, 'nutritionalInformation')}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Carbohydrates"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    name="totalFat"
                    value={formData.nutritionalInformation?.totalFat || ''}
                    onChange={(e) => handleNestedChange(e, 'nutritionalInformation')}
                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Fat"
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
