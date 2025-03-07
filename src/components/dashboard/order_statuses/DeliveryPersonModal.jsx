import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';
import { useSocketContext } from '../../../contexts/SocketContext';

const Modal = ({ isOpen, onClose, updateDeliveryPerson, }) => {

  const [ourDeliveryPersonList, setOurDeliveryPersonList] = useState([])
  const [theirOwnDeliveryPersonList, setTheirOwnDeliveryPersonList] = useState([])
  const { authUser } = useAuthUserContext()
  const [showOurs, setShowOurs] = useState(true);
  const [showTheirs, setShowTheirs] = useState(true);
  const [updateDeliveryPersonLists, setUpdateDeliveryPersonLists] = useState(false)
  const socket = useSocketContext()


  useEffect(() => {
    if (socket) {

      socket.on('updateDeliveryPersonLists', (data) => setUpdateDeliveryPersonLists(!updateDeliveryPerson));


      return () => socket.off('updateDeliveryPersonLists')
    }
  }, [socket])



  useEffect(() => {
    async function get() {
      try {
        const [response1, response2] = await Promise.all([
          axios.get('http://localhost:4000/user/employer/us', { withCredentials: true }),
          axios.get(`http://localhost:4000/user/employer/${authUser.name}`, { withCredentials: true })
        ]);

        setOurDeliveryPersonList(response1.data);
        setTheirOwnDeliveryPersonList(response2.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    get();
  }, [updateDeliveryPersonLists]);


  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-5">
      <div className="bg-white rounded-lg px-5 py-3 w-full h-full overflow-scroll">

        <div className='flex justify-between'>
          <button onClick={onClose} className="mt-4 mr-96 bg-red-500 text-white text-right px-4 py-2 rounded-lg">X</button>
          <h2 className="text-lg font-bold mb-4">Select Active Delivery Person</h2>
        </div>

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
              <ul className="pl-4 mt-2">
                {theirOwnDeliveryPersonList.map((person) => (
                  <li key={person._id} className="mb-2">
                    <button
                      onClick={() => updateDeliveryPerson(person)}
                      className="flex items-center justify-between pl-10 pr-20 py-2 w-full hover:bg-gray-100 rounded-lg"
                    >
                      <h1 className="w-56 text-left">{person.username}</h1>
                      <h1>{person.phoneNumber}</h1>
                      <img src={person.image} className="w-6 h-6 rounded-md" />
                    </button>
                  </li>
                ))}
              </ul>
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
                      <h1 className="w-56 text-left">{person.username}</h1>
                      <h1>{person.phoneNumber}</h1>
                      <img src={person.image} className="w-6 h-6 rounded-md" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>


        </ul>

      </div>
    </div>
  );
};

export default Modal;
