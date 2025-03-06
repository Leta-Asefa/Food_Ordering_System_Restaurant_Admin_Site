import React, { useState, useEffect } from 'react';
import DisplayOrders from './DisplayOrders';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';

const All = () => {
    const { authUser } = useAuthUserContext()
    const [orders, setOrders] = useState([])
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
    }, [searchQuery]); // Will re-run the filter on every search query change

    useEffect(() => {
        async function get() {
            const response = await axios.get(`http://localhost:4000/order/restaurant/${authUser._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            console.log(response.data)

            setOrders(response.data)
            setFilteredOrders(response.data)

        }

        get()


    }, [])



    return (
        <div>
            {/* Search Input */}
            <div className='flex justify-center items-center px-1'>

                <input
                    type="text"
                    placeholder="Search orders..."
                    className=" w-96 mx-auto border-b border-gray-500  px-4 py-2 text-sm focus:rounded-lg focus:border-white focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Display Orders */}
            <div className='bg-white px-5 py-1 rounded-lg overflow-hidden text-xs space-y-2'>
                {filteredOrders.map(order => (
                    <DisplayOrders key={order._id} order={order} />
                ))}
            </div>
        </div>
    );
};

export default All;
