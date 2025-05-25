import React, { useState, useEffect } from 'react';
import DisplayOrders from './DisplayOrders';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import { useSocketContext } from '../../../contexts/SocketContext';

const Processing = () => {
    const { authUser } = useAuthUserContext()
    const [orders, setOrders] = useState([])
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [searchQuery, setSearchQuery] = useState('');
    const [ourDeliveryPersonList, setOurDeliveryPersonList] = useState([])
    const [theirOwnDeliveryPersonList, setTheirOwnDeliveryPersonList] = useState([])
    const [updateActiveDeliveryPeople, setUpdateActiveDeliveryPeople] = useState(false)
    const [loadingActiveDeliveryPeople,setLoadingActiveDeliveryPeople]=useState(false)
    const socket = useSocketContext()


    useEffect(() => {
        if (socket) {

            socket.on('offerAccepted', (data) => {
                setOrders((prevOrders) =>
                    prevOrders.map(order => {

                        if (order._id === data.orderId) {
                            console.log("Order ", order, "+", data)
                            return { ...order, deliveryPersonId: data.deliveryPersonId }
                        }
                        else
                            return order
                    }
                    )
                );
            });


            return () => socket.off('offerAccepted')
        }
    }, [socket])


    useEffect(() => {
        if (socket) {

            socket.on('offerNotAccepted', (data) => {
                console.log("Offer Not Accepted !", data)
                setOrders((prevOrders) => {
                    return prevOrders.map(order => {

                        if (order._id === data.orderId) {
                            alert(`Deliver Person declines your offer, please assign another, for customer "${order.userId.username}" `)
                            return { ...order, deliveryPersonId: data.deliveryPersonId }
                        }
                        else
                            return order
                    }
                    );
                }
                );


            });


            return () => socket.off('offerNotAccepted')
        }
    }, [socket])



    // This will run on search query change and update filtered orders
    useEffect(() => {

        if (!searchQuery)
            setFilteredOrders(orders)


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
    }, [searchQuery, orders]); // Will re-run the filter on every search query change

    useEffect(() => {
        async function get() {
            const response = await axios.get(`http://localhost:4000/order/restaurant/${authUser._id}/status/Processing`, {
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

    useEffect(() => {
        // Only fetch if authUser and location are available
        if (!authUser || !authUser.location || !authUser.location.coordinates || authUser.location.coordinates.length < 2) return;

        async function get() {
            try {
                setLoadingActiveDeliveryPeople(true);
                const response = await axios.get(`http://localhost:4000/gps/get_nearby_locations/${authUser.location.coordinates[1]}/${authUser.location.coordinates[0]}`, { withCredentials: true });
                let ours = [];
                let theirs = [];
                response.data.nearbyDeliveryPeople.forEach(deliveryPerson => {
                    if (deliveryPerson.employer === authUser._id)
                        theirs.push(deliveryPerson);
                    else if (deliveryPerson.employer === 'us')
                        ours.push(deliveryPerson);
                });
                setOurDeliveryPersonList(ours);
                setTheirOwnDeliveryPersonList(theirs);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoadingActiveDeliveryPeople(false);
            }
        }
        get();
    }, [updateActiveDeliveryPeople, authUser]);

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
                    className=" w-96 mx-auto border-b border-gray-500  px-4 py-2 text-sm focus:rounded-lg focus:border-white focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Display Orders */}
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

export default Processing;
