import React, { useState, useEffect } from 'react';
import DisplayOrders from './DisplayOrders';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';
import axios from 'axios';

const All = () => {
    const { authUser } = useAuthUserContext()
    const [orders, setOrders] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredOrders, setFilteredOrders] = useState(orders);

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
                order.payment.status.toLowerCase().includes(searchTerm) ||
                order.paymentMethod.toLowerCase().includes(searchTerm) ||
                order.shippingAddress.address.toLowerCase().includes(searchTerm)
            );
        });
        setFilteredOrders(filtered);
    }, [searchQuery]); // Will re-run the filter on every search query change

    useEffect(() => {
        async function get() {
            const response = await axios.get(`http://localhost:4000/order/restaurant/${authUser._id}`,{
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            setOrders(response.data)
            setFilteredOrders(response.data)

        }

        get()
        

    }, [])



    return (
        <div>
            {/* Search Input */}
            <div className='flex flex-row justify-center items-center gap-5 py-2'>
                <input
                    type='text'
                    className='px-3 py-1 bg-orange-200 w-96 rounded-lg'
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)} // Dynamically update filteredOrders
                />
                <img
                    src='/search.svg'
                    className='w-10 h-10 rounded-full cursor-pointer'
                    alt="Search"
                />
            </div>

            {/* Display Orders */}
            <div className='bg-gray-50 px-5 py-1 rounded-lg overflow-hidden text-xs space-y-2'>
                {filteredOrders.map(order => (
                    <DisplayOrders key={order._id} order={order} />
                ))}
            </div>
        </div>
    );
};

export default All;
