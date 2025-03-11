import React, { useState } from 'react';
import Modal from './DeliveryPersonModal';
import axios from 'axios';

const DisplayOrders = ({ order,ourDeliveryPersonList,theirOwnDeliveryPersonList }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDeliveryPerson, setSelectedDeliveryPerson] = useState(order.deliveryPersonId);
    const [status, setStatus] = useState(order.status)
    const handleImageClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const updateDeliveryPerson = async (person) => {

        console.log("Person",person)

        try {
            const response = await axios.get(`http://localhost:4000/order/${order._id}/deliveryoffer/${person.userId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            console.log("offer",response)

            if (response.data.message) {
                setSelectedDeliveryPerson(person)
                alert(`Delivery offer is sent to ${person.username}. if he/she declines or not answer in 45 seconds , we will notify you to change another person !`)
            }

        } catch (error) {
            console.error('Error updating status:', error);
        }

        setIsModalOpen(false);
    };

    const handleStatusChange = async (e) => {
        const newStatus = e.target.value;
        setStatus(newStatus);

        try {
            const response = await axios.put(`http://localhost:4000/order/${order._id}/status`, {
                status: newStatus
            }, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log(response)
            if (response.data.message)
                setStatus(newStatus)

        } catch (error) {
            console.error('Error updating status:', error);
        }
    };


    return (
        <div className='p-2 rounded-lg bg-gray-200'>
            <div className='flex justify-between font-extrabold w-full text-sm border-b-2 border-gray-300 mb-1'>
                <div className=''>Order ID : {order._id}</div>
                <div>Customer Name : {order.userId.username}</div>
                <div>Customer Contact : {order.userId.phoneNumber}</div>
            </div>
            <div className='flex flex-row justify-between'>
                <div>

                    <div className='flex gap-x-3 gap-y-1 flex-grow flex-wrap p-1 pl-0'>
                        <div className='font-semibold'>Order Items : </div>
                        {order.items.map((item) => {
                            return <div className='p-0'> {item.item.name} ({item.quantity}X) </div>
                        })}
                    </div>

                    <div className=''>
                        <div className='font-semibold'>Total : <span className='font-normal'>{order.totalAmount} ETB</span> </div>
                    </div>

                    <div className='flex flex-row gap-5'>
                        <div className='font-semibold'>Delivery Address</div>
                        <div>{order.shippingAddress.address}</div>
                    </div>

                </div>

                <div>

                    <div className='flex flex-row' >
                        <div>
                            <div className='font-semibold'>{order.deliveryPersonId?.username || "Not Assigned !"}</div>
                            <div className=''>{order.deliveryPersonId?.phoneNumber || 'Not Assigned !'}</div>
                            <div
                                onClick={handleImageClick}
                                className={`bg-gray-800 text-white hover:bg-gray-600 rounded-lg px-1 ${order.status==='Processing'?'visible':'hidden'}`}
                            >
                                Change Delivery Person</div>
                        </div>

                        <img src={order.deliveryPersonId?.image || '/profile.svg'} className='w-10 h-10 mx-auto rounded-lg' />
                    </div>
                    <div className=''>Order Date : {order.createdAt}</div>
                    <div className=''>
                        <label for="status">Status : </label>
                        <select id="status" name="status" value={status} onChange={(e) => handleStatusChange(e)}>
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Cancelled">Cancelled</option>
                            <option value="OnTransit">On Transit</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Ready For Pickup">Ready For Pickup</option>
                            <option value="Picked Up">Pickedup</option>
                        </select>
                    </div>
                </div>



            </div>


            <Modal 
            isOpen={isModalOpen} 
            onClose={handleCloseModal} 
            updateDeliveryPerson={updateDeliveryPerson} 
            ourDeliveryPersonList={ourDeliveryPersonList}
            theirOwnDeliveryPersonList={theirOwnDeliveryPersonList}
            />

        </div>
    );
};

export default DisplayOrders;