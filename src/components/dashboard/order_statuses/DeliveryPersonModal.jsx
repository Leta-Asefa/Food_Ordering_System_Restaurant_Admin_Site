import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Modal = ({ isOpen, onClose, updateDeliveryPerson, }) => {

  const [ourDeliveryPersonList, setOurDeliveryPersonList] = useState([])
  const [theirOwnDeliveryPersonList, setTheirOwnDeliveryPersonList] = useState([])


  useEffect(() => {
    async function get() {
      const response1 = await axios.get(`http://localhost:4000/user/employer/we`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setOurDeliveryPersonList(response1.data)

      const response2 = await axios.get(`http://localhost:4000/user/employer/Romina`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      setTheirOwnDeliveryPersonList(response2.data)

    }

    get()
    console.log(ourDeliveryPersonList, '----', theirOwnDeliveryPersonList)

  }, [])

  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-lg p-10 w-full h-full overflow-scroll">
        <h2 className="text-lg font-bold mb-4">Select Delivery Person</h2>
        <ul>
          <h1>Ours</h1>
          {ourDeliveryPersonList.map((person) => (
            <li key={person._id} className="mb-2">
              <button
                onClick={() => onSelectDeliveryPerson(person)}
                className="flex items-center justify-between pl-20 pr-44 py-2 w-full hover:bg-gray-100 rounded-lg"
              >
                <h1 className='w-56 text-left'>{person.username}</h1>
                <h1>{person.phoneNumber}</h1>
                <img src={person.image} className='w-6 h-6 rounded-md'/>
              </button>
            </li>
          ))}

          <h1>Romina's</h1>
          {theirOwnDeliveryPersonList.map((person) => (
            <li key={person._id} className="mb-2">
              <button
                onClick={() => updateDeliveryPerson(person)}
                className="flex items-center justify-between pl-20 pr-44 py-2 w-full hover:bg-gray-100 rounded-lg"
              >
                <h1 className='w-56 text-left'>{person.username}</h1>
                <h1>{person.phoneNumber}</h1>
                <img src={person.image} className='w-6 h-6 rounded-md'/>
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
