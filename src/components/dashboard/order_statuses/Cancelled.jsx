import React, { useEffect, useState } from 'react';
import DisplayOrders from './DisplayOrders';
import axios from 'axios';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';

const Cancelled = () => {
   
    const [orders, setOrders] = useState([])
    const { authUser } = useAuthUserContext()

    useEffect(() => {
        async function get() {
            const response = await axios.get(`http://localhost:4000/order/restaurant/${authUser._id}/status/Cancelled`, {
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
             <div className='flex flex-row justify-center items-center gap-5 py-2'>
                <input type='text' className='px-3 py-1 bg-orange-200 w-96 rounded-lg' />
                <img src='/search.svg' className='w-10 h-10 rounded-full' />
            </div>

            <div className='bg-gray-50 px-5 py-1 rounded-lg overflow-hidden text-xs  space-y-2'>
                {
                    orders.map(order => {
                        return <DisplayOrders order={order} />
                    })
                }
            </div>
        </div>
    );
};

export default Cancelled;