import React, { useEffect, useState } from 'react';
import DisplayOrders from './DisplayOrders';
import axios from 'axios';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';
import { useSocketContext } from '../../../contexts/SocketContext';

const Pending = () => {

    const [orders, setOrders] = useState([])
    const { authUser } = useAuthUserContext()
        const [filteredOrders, setFilteredOrders] = useState(orders);
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
    const socket = useSocketContext()

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
        setCurrentPage(1)
    }, [searchQuery,orders]); // Will re-run the filter on every search query change


    useEffect(() => {
        async function get() {
            const response = await axios.get(`http://localhost:4000/order/restaurant/${authUser._id}/status/Pending`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            setOrders(response.data)

        }

        get()


    }, [])

    useEffect(() => {
        if (socket) {

            socket.on('order_status_update', (data) => {
                console.log("order_status_update receied", data)
                // Remove the order with data.orderId from the orders list and rerender
                setOrders(prevOrders => prevOrders.filter(order => order._id !== data.orderId));
            });


            return () => socket.off('order_status_update')
        }
    }, [socket])
   
   
    useEffect(() => {
        if (socket) {

            socket.on('new_order_added', (order) => {
                console.log("new order added", order)
                setOrders(prevOrders => [...prevOrders, order]);     });


            return () => socket.off('new_order_added')
        }
    }, [socket])


    // Remove order from list after status update
    const handleOrderUpdate = (orderId) => {
        console.log("Order ID to remove: ", orderId);
        setOrders(prevOrders => prevOrders.filter(order => order._id !== orderId));
    };

    return (
        <div>
            {/* Search Input */}
            <div className='flex justify-center items-center px-1'>

                <input
                    type="text"
                    placeholder="Search orders..."
                    className=" w-96 mt-2 mx-auto border-b border-gray-400  px-4 py-2 text-sm bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div className='bg-white px-5 py-1 rounded-lg overflow-hidden text-xs  space-y-2'>
                {paginatedOrders.length === 0 ? (
                    <div className="text-center text-gray-400 py-8">No order is found.</div>
                ) : (
                    paginatedOrders.map(order => (
                        <DisplayOrders order={order} onOrderUpdate={handleOrderUpdate} />
                    ))
                )}
            </div>
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Pending;