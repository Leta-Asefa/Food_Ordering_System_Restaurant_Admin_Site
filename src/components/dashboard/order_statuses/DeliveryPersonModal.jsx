import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Modal = ({ isOpen, onClose, updateDeliveryPerson, ourDeliveryPersonList, theirOwnDeliveryPersonList, loadingActiveDeliveryPeople }) => {

  const [showOurs, setShowOurs] = useState(true);
  const [showTheirs, setShowTheirs] = useState(true);

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-7">
      <div className="bg-white rounded-lg px-5 py-3 w-full h-full">

        <div className='flex justify-between'>
          <button onClick={onClose} className="mt-4 mr-96 bg-red-500 text-white text-right px-4 py-2 rounded-lg">X</button>
          <h2 className="text-lg font-bold mb-4">Select Active Delivery Person</h2>
        </div>

        {
          loadingActiveDeliveryPeople ? (
            <div class="flex justify-center items-center h-screen">
              <div class="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
            </div>

          ) :
            (

              <ul className="w-full">


                {/* Romina's Dropdown */}
                <li className="mt-4">
                  <button
                    onClick={() => setShowTheirs(!showTheirs)}
                    className="flex justify-between items-center w-full bg-gray-200 p-2 rounded-lg"
                  >
                    <h1 className="text-lg font-semibold">Romina's</h1>
                    <span>{showTheirs ? "▲" : "▼"}</span>
                  </button>

                  {showTheirs && (
                    <div className="pl-4 mt-2">
                      {theirOwnDeliveryPersonList.map((person) => (
                        <div key={person._id} className="mb-2">
                          <button
                            onClick={() => updateDeliveryPerson(person)}
                            className="flex items-center justify-between  w-full pl-10 pr-20 py-2 w-fdivl hover:bg-gray-100 rounded-lg"
                          >
                            <img src={person.image} className="w-6 h-6 rounded-md" />
                            <h1 className="w-56 text-left"><b>{person.username}</b></h1>
                            <h1>{person.phoneNumber}</h1>
                            <h1>{person.distance}  away</h1>
                            <h1>{person.duration} to arrive</h1>
                          <h1 className='flex gap-2 items-center'>{person.rating} <FaStar className='text-orange-500'/> </h1>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </li>


                {/* Ours Dropdown */}
                <li>
                  <button
                    onClick={() => setShowOurs(!showOurs)}
                    className="flex justify-between items-center w-full bg-gray-200 p-2 rounded-lg"
                  >
                    <h1 className="text-lg font-semibold">Ours</h1>
                    <span>{showOurs ? "▲" : "▼"}</span>
                  </button>

                  {showOurs && (
                    <ul className="pl-4 mt-2">
                      {ourDeliveryPersonList.map((person) => (
                        <li key={person._id} className="mb-2">
                          <button
                            onClick={() => updateDeliveryPerson(person)}
                            className="flex items-center justify-between pl-10 pr-20 py-2 w-full hover:bg-gray-100 rounded-lg"
                          >
                            <img src={person.image} className="w-6 h-6 rounded-md" />
                            <h1 className="w-56 text-left"><b>{person.username}</b></h1>
                            <h1>{person.phoneNumber}</h1>
                            <h1>{person.distance}  away</h1>
                            <h1>{person.duration} to arrive</h1>
                            <h1>Rating : {person.rating}</h1>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>


              </ul>

            )
        }







      </div>
    </div>
  );
};

export default Modal;
