import React, { useState } from 'react';
import Modal from './DeliveryPersonModal';

const DisplayOrders = ({ order }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(order.deliveryPerson);
  
    const handleImageClick = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    const handleSelectDeliveryPerson = (person) => {
      setSelectedDeliveryPerson(person.name);

      setIsModalOpen(false);
    };


    return (
        <div className='p-2 rounded-lg bg-gray-200'>
            <div className='flex justify-between font-extrabold w-full text-sm border-b-2 border-gray-300 mb-1'>
                <div className=''>Order ID : {order.id}</div>
                <div>Customer Name : {order.customerName}</div>
                <div>Customer Contact : {order.customerContact}</div>
            </div>
            <div className='flex flex-row justify-between'>
                <div>

                    <div className='flex flex-row gap-3'>
                        <div className='font-semibold'>Order Items : </div>
                        {order.items.map((item) => {
                            return <div> {item.name} ({item.quantity})  </div>
                        })}
                    </div>

                    <div className=''>
                        <div className='font-semibold'>Payment Status : <span className='text-green-500 '>{order.paymentStatus}</span> </div>
                        <div className='font-semibold'>Total : <span className='font-normal'>{order.total} ETB</span> </div>
                        <div className='font-semibold'>Payment Method : <span className='font-normal'>{order.paymentMethod}</span></div>
                    </div>

                    <div className='flex flex-row gap-5'>
                        <div className='font-semibold'>Delivery Address</div>
                        <div>{order.deliveryAddress}</div>
                    </div>

                </div>

                <div>
                        
                    <div className='flex flex-row' >
                        <div>
                            <div className='font-semibold'>   {/*order.deliveryPerson*/}  {selectedDeliveryPerson}</div>
                            <div className=''>0987654321</div>
                            <div onClick={handleImageClick} className='bg-gray-800 text-white hover:bg-gray-600 rounded-lg px-1'>Change Delivery Person</div>
                        </div>

                        <img src='/profilepic.jpeg' className='w-10 h-10 mx-auto rounded-lg' />
                    </div>
                    <div className=''>Order Date : 2021-03-03 12:09:23 PM</div>
                    <div className=''>
                        <label for="status">Status : </label>
                        <select id="status" name="status">
                            <option value="pending">Pending</option>
                            <option value="delivered">Delivered</option>
                            <option value="on-transit">On Transit</option>
                        </select>
                    </div>
                </div>



            </div>


            <Modal isOpen={isModalOpen} onClose={handleCloseModal} onSelectDeliveryPerson={handleSelectDeliveryPerson} />
  
        </div>
    );
};

export default DisplayOrders;