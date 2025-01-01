import React from 'react';

const Modal = ({ isOpen, onClose, onSelectDeliveryPerson }) => {
  const deliveryPersons = [
    { id: 1, name: 'John Doe', contact: '0987654321' },
    { id: 2, name: 'Jane Smith', contact: '0987654322' },
    { id: 3, name: 'Mike Johnson', contact: '0987654323' },
    // Add more delivery persons as needed
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-1/3">
        <h2 className="text-lg font-bold mb-4">Select Delivery Person</h2>
        <ul>
          {deliveryPersons.map((person) => (
            <li key={person.id} className="mb-2">
              <button
                onClick={() => onSelectDeliveryPerson(person)}
                className="flex items-center p-2 w-full hover:bg-gray-100 rounded-lg"
              >
                <span className="ml-2">{person.name} ({person.contact})</span>
              </button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
