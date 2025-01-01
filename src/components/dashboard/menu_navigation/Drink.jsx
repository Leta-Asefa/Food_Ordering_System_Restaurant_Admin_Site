import React, { useState } from 'react';
import ItemModal from './ItemModal';

const Drink = () => {
  const [drinks, setDrinks] = useState([
    {
      _id: '1',
      name: 'Mojito',
      price: 7.99,
      description: 'A refreshing cocktail with mint, lime, and soda water.',
      image: '/drink1.jpeg',
      isFasting: false,
      calories: 150,
      nutritionalInformation: {
        protein: 0,
        totalCarbohydrates: 20,
        totalFat: 0,
      },
      preparationTime: '5 minutes',
      allergensInformation: ['None'],
    },
    {
      _id: '2',
      name: 'Smoothie',
      price: 5.99,
      description: 'A healthy blend of fruits and yogurt.',
      image: '/drink2.jpeg',
      isFasting: true,
      calories: 200,
      nutritionalInformation: {
        protein: 5,
        totalCarbohydrates: 35,
        totalFat: 3,
      },
      preparationTime: '7 minutes',
      allergensInformation: ['Dairy'],
    },
    {
      _id: '3',
      name: 'Cappuccino',
      price: 4.49,
      description: 'A classic Italian coffee with steamed milk foam.',
      image: '/drink3.jpeg',
      isFasting: false,
      calories: 100,
      nutritionalInformation: {
        protein: 4,
        totalCarbohydrates: 10,
        totalFat: 3,
      },
      preparationTime: '3 minutes',
      allergensInformation: ['Dairy'],
    },
    {
      _id: '4',
      name: 'Iced Tea',
      price: 2.99,
      description: 'A cool and refreshing tea, served over ice.',
      image: '/drink4.jpeg',
      isFasting: true,
      calories: 80,
      nutritionalInformation: {
        protein: 0,
        totalCarbohydrates: 20,
        totalFat: 0,
      },
      preparationTime: '5 minutes',
      allergensInformation: ['None'],
    },
    {
      _id: '5',
      name: 'Protein Shake',
      price: 6.99,
      description: 'A high-protein shake for muscle recovery.',
      image: '/drink1.jpeg',
      isFasting: false,
      calories: 250,
      nutritionalInformation: {
        protein: 30,
        totalCarbohydrates: 20,
        totalFat: 5,
      },
      preparationTime: '2 minutes',
      allergensInformation: ['Dairy'],
    },
    {
      _id: '6',
      name: 'Lemonade',
      price: 3.99,
      description: 'A sweet and tart drink made with fresh lemons.',
      image: '/drink2.jpeg',
      isFasting: true,
      calories: 120,
      nutritionalInformation: {
        protein: 0,
        totalCarbohydrates: 30,
        totalFat: 0,
      },
      preparationTime: '5 minutes',
      allergensInformation: ['None'],
    },
    {
      _id: '7',
      name: 'Hot Chocolate',
      price: 3.49,
      description: 'A warm and comforting chocolate drink.',
      image: '/drink3.jpeg',
      isFasting: false,
      calories: 180,
      nutritionalInformation: {
        protein: 5,
        totalCarbohydrates: 30,
        totalFat: 5,
      },
      preparationTime: '4 minutes',
      allergensInformation: ['Dairy'],
    },
    {
      _id: '8',
      name: 'Green Juice',
      price: 4.99,
      description: 'A healthy juice made from fresh greens.',
      image: '/drink4.jpeg',
      isFasting: true,
      calories: 90,
      nutritionalInformation: {
        protein: 2,
        totalCarbohydrates: 20,
        totalFat: 0,
      },
      preparationTime: '6 minutes',
      allergensInformation: ['None'],
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);

  const handleOpenModal = (drink) => {
    setSelectedDrink(drink);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateDrink = (updatedDrink) => {
    setDrinks((prevDrinks) =>
      prevDrinks.map((drink) => (drink._id === updatedDrink._id ? updatedDrink : drink))
    );
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 p-6">
      {drinks.map((drink) => (
        <div
          key={drink._id}
          className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
          onClick={() => handleOpenModal(drink)}
        >
          <img
            src={drink.image}
            alt={drink.name}
            className="w-full h-32 object-cover"
          />
          <div className="p-4">
            <h2 className="text-xs font-semibold mb-2">{drink.name}</h2>
            <p className="text-gray-800 font-bold">${drink.price}</p>
          </div>
        </div>
      ))}
      <ItemModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onUpdate={handleUpdateDrink}
        selectedFood={selectedDrink}
      />
    </div>
  );
};

export default Drink;
