import React, { useEffect, useState } from 'react';
import DisplayOrders from './DisplayOrders';
import axios from 'axios';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';

const OnTransit = () => {

    const [orders, setOrders] = useState([])
    const { authUser } = useAuthUserContext()
        const [filteredOrders, setFilteredOrders] = useState(orders);
    const [searchQuery, setSearchQuery] = useState('');

    // This will run on search query change and update filtered orders
    useEffect(() => {
        const filtered = orders.filter(order => {
            const searchTerm = searchQuery.toLowerCase();
            return (
                order._id.toLowerCase().includes(searchTerm) ||
                order.userId.username.toLowerCase().includes(searchTerm) ||
                order.userId.phoneNumber.toLowerCase().includes(searchTerm) ||
                order.items.some(item =>
                    item.item.name.toLowerCase().includes(searchTerm)
                ) ||
                order.shippingAddress.address.toLowerCase().includes(searchTerm)
            );
        });
        setFilteredOrders(filtered);
    }, [searchQuery, orders]); // Re-run filter when searchQuery or orders change


    useEffect(() => {
        async function get() {
            const response = await axios.get(`http://localhost:4000/order/restaurant/${authUser._id}/status/OnTransit`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });
            console.log("OnTransit Orders: ", response.data)

            setOrders(response.data)

        }

        get()


    }, [])

    // Remove order from list after status update
    const handleOrderUpdate = (orderId) => {
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    };
    
    return (
        <div>
            {/* Search Input */}
            <div className='flex justify-center items-center px-1'>

                <input
                    type="text"
                    placeholder="Search orders..."
                    className=" w-96 mx-auto border-b border-gray-400  px-4 py-2 text-sm bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className='bg-white px-5 py-1 rounded-lg overflow-hidden text-xs  space-y-2'>
                {filteredOrders.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">No order is found.</div>
                ) : (
                    filteredOrders.map(order => (
                        <DisplayOrders order={order} onOrderUpdate={handleOrderUpdate} />
                    ))
                )}
            </div>
        </div>
    );
};

export default OnTransit;