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
  const [isLoading,setIsLoading]=useState(false)
  


  useEffect(() => { 

    async function get() {

      try {
        
        const response = await axios.get(`http://localhost:4000/gps/get_nearby_locations/${authUser.location.coordinates[0]}/${authUser.location.coordinates[1]}`, { withCredentials: true })
        
        console.log(response.data)
        
        let ours = []
        let theirs = []
        
        response.data.nearbyDeliveryPeople.forEach(deliveryPerson => {
          if (deliveryPerson.employer === authUser.name)
            theirs.push(deliveryPerson);
          else if (deliveryPerson.employer === 'us')
            ours.push(deliveryPerson);
        });
        

        setOurDeliveryPersonList(ours)
        setTheirOwnDeliveryPersonList(theirs)
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setIsLoading(false)
      }

    }
    
    setIsLoading(true)
    get();
  }, []);


  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-7">
      <div className="bg-white rounded-lg px-5 py-3 w-full h-full">

        <div className='flex justify-between'>
          <button onClick={onClose} className="mt-4 mr-96 bg-red-500 text-white text-right px-4 py-2 rounded-lg">X</button>
          <h2 className="text-lg font-bold mb-4">Select Active Delivery Person</h2>
        </div>

        {

          isLoading? (  <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
          </div>) : (
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
                        <h1 className="w-56 text-left">{person.username}</h1>
                        <h1>{person.phoneNumber}</h1>
                        <img src={person.image} className="w-6 h-6 rounded-md" />
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
          )

        }

      

      </div>
    </div>
  );
};

export default Modal;
