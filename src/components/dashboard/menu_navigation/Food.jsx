import React, { useState } from 'react';
import ItemModal from './ItemModal';

const Food = () => {
  const [foods, setFoods] = useState([
    {
        _id: '1',
        name: 'Grilled Chicken Salad',
        price: 12.99,
        description: 'A healthy grilled chicken salad with fresh greens.',
        image: '/food1.jpeg',
        isFasting: false,
        calories: 350,
        nutritionalInformation: {
          protein: 30,
          totalCarbohydrates: 15,
          totalFat: 10,
        },
        preparationTime: '15 minutes',
        allergensInformation: ['Chicken', 'Dairy'],
      },
      {
        _id: '2',
        name: 'Veggie Burger',
        price: 8.99,
        description: 'A delicious veggie burger with fresh vegetables.',
        image: '/food2.jpg',
        isFasting: true,
        calories: 250,
        nutritionalInformation: {
          protein: 10,
          totalCarbohydrates: 35,
          totalFat: 8,
        },
        preparationTime: '10 minutes',
        allergensInformation: ['Wheat', 'Soy'],
      },
      {
        _id: '3',
        name: 'Spaghetti Carbonara',
        price: 15.49,
        description: 'Classic Italian pasta with creamy sauce and bacon.',
        image: '/food3.jpeg',
        isFasting: false,
        calories: 500,
        nutritionalInformation: {
          protein: 20,
          totalCarbohydrates: 50,
          totalFat: 15,
        },
        preparationTime: '20 minutes',
        allergensInformation: ['Gluten', 'Egg', 'Dairy'],
      },
      {
        _id: '4',
        name: 'Margherita Pizza',
        price: 10.99,
        description: 'A simple pizza with fresh mozzarella and basil.',
        image: '/food4.jpeg',
        isFasting: true,
        calories: 300,
        nutritionalInformation: {
          protein: 12,
          totalCarbohydrates: 40,
          totalFat: 8,
        },
        preparationTime: '15 minutes',
        allergensInformation: ['Gluten', 'Dairy'],
      },
      {
        _id: '5',
        name: 'Beef Steak',
        price: 18.99,
        description: 'Juicy beef steak with a side of roasted vegetables.',
        image: '/food2.jpg',
        isFasting: false,
        calories: 600,
        nutritionalInformation: {
          protein: 50,
          totalCarbohydrates: 5,
          totalFat: 20,
        },
        preparationTime: '30 minutes',
        allergensInformation: ['None'],
      },
      {
        _id: '6',
        name: 'Pasta Primavera',
        price: 14.99,
        description: 'Pasta with fresh vegetables and light olive oil sauce.',
        image: '/food3.jpeg',
        isFasting: true,
        calories: 400,
        nutritionalInformation: {
          protein: 15,
          totalCarbohydrates: 45,
          totalFat: 10,
        },
        preparationTime: '20 minutes',
        allergensInformation: ['Gluten'],
      },
      {
        _id: '7',
        name: 'Caesar Salad',
        price: 9.99,
        description: 'Crisp romaine lettuce with Caesar dressing and croutons.',
        image: '/food4.jpeg',
        isFasting: true,
        calories: 200,
        nutritionalInformation: {
          protein: 8,
          totalCarbohydrates: 12,
          totalFat: 15,
        },
        preparationTime: '10 minutes',
        allergensInformation: ['Dairy', 'Egg', 'Fish'],
      },
      {
        _id: '8',
        name: 'Lentil Soup',
        price: 7.99,
        description: 'Hearty and flavorful lentil soup with herbs and spices.',
        image: '/food2.jpg',
        isFasting: true,
        calories: 180,
        nutritionalInformation: {
          protein: 12,
          totalCarbohydrates: 25,
          totalFat: 5,
        },
        preparationTime: '25 minutes',
        allergensInformation: ['None'],
      },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

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

export default Food;
