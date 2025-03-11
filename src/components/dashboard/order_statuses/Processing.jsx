import React, { useEffect, useState } from 'react';
import DisplayOrders from './DisplayOrders';
import axios from 'axios';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';
import { useSocketContext } from '../../../contexts/SocketContext';

const Processing = () => {

    const [orders, setOrders] = useState([])
    const { authUser } = useAuthUserContext()
    const [filteredOrders, setFilteredOrders] = useState(orders);
    const [searchQuery, setSearchQuery] = useState('');
    const socket = useSocketContext()
    const [ourDeliveryPersonList, setOurDeliveryPersonList] = useState([])
    const [theirOwnDeliveryPersonList, setTheirOwnDeliveryPersonList] = useState([])

    useEffect(() => {
        if (socket) {

            socket.on('offerAccepted', (data) => {
                setOrders((prevOrders) =>
                    prevOrders.map(order =>
                        order._id === data.orderId
                            ? { ...order, deliveryPersonId: data.deliveryPersonId }
                            : order
                    )
                );
            });


            return () => socket.off('offerAccepted')
        }
    }, [socket])


    useEffect(() => {
        if (socket) {

            socket.on('offerNotAccepted', (data) => {
                setOrders((prevOrders) =>
                    prevOrders.map(order =>
                        order._id === data.orderId
                            ? { ...order, deliveryPersonId: data.deliveryPersonId }
                            : order
                    )
                );
            });


            return () => socket.off('offerNotAccepted')
        }
    }, [socket])


    useEffect(() => {

        async function get() {

            try {

                const response = await axios.get(`http://localhost:4000/gps/get_nearby_locations/${authUser.location.coordinates[0]}/${authUser.location.coordinates[1]}`, { withCredentials: true })

                console.log("FTW ", response.data)

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
            } finally {
            }

        }

        get();
    }, [authUser]);




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
            const response = await axios.get(`http://localhost:4000/order/restaurant/${authUser._id}/status/Processing`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            setOrders(response.data)

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

            <div className='bg-gray-50 px-5 py-1 rounded-lg overflow-hidden text-xs  space-y-2'>
                {
                    orders.map(order => {
                        return <DisplayOrders 
                        order={order} 
                        theirOwnDeliveryPersonList={theirOwnDeliveryPersonList} 
                        ourDeliveryPersonList={ourDeliveryPersonList}
                        />
                    })
                }
            </div>
        </div>
    );
};

export default Processing;