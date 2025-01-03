import React, { useEffect, useState } from 'react';
import ItemModal from './ItemModal';
import axios from 'axios';

const Catering = () => {
  const [foods, setFoods] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    async function get() {
      const response = await axios.get(`http://localhost:4000/item/catering`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setFoods(response.data)

    }

    get()

  }, [])

  const handleOpenModal = (food) => {
    setSelectedFood(food);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateFood = (updatedFood) => {
    setFoods((prevFoods) =>
      prevFoods.map((food) => (food._id === updatedFood._id ? updatedFood : food))
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 p-6">
      {foods.map((food) => (
        <div
          key={food._id}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => handleOpenModal(food)}
        >
          <img
            src={food.image}
            alt={food.name}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xs font-semibold mb-2">{food.name}</h2>
            <p className="text-gray-800 font-bold">${food.price}</p>
          </div>
        </div>
      ))}
      <ItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdateFood}
        selectedFood={selectedFood}
      />
    </div>
  );
};

export default Catering;
