import React from 'react';
import { NavLink } from 'react-router-dom';

const Order = () => {

    return (
        <div className='sticky top-0 bg-orange-400 rounded-lg'>


            <div className='flex flex-row justify-center gap-1 py-5'>
                <NavLink
                    to='/orders/all'
                    className={({ isActive }) =>
                        `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-gray-400 font-bold text-white ' : 'bg-gray-100'
                        }`
                    }
                >
                    All
                </NavLink>

                <NavLink
                    to='/orders/pending'
                    className={({ isActive }) =>
                        `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-orange-400 font-bold text-white' : 'bg-orange-200'
                        }`
                    }
                >
                    Pending
                </NavLink>

                <NavLink
                    to='/orders/paid'
                    className={({ isActive }) =>
                        `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-green-400 font-bold text-white' : 'bg-green-200'
                        }`
                    }
                >
                    Paid
                </NavLink>

                <NavLink
                    to='/orders/ontransit'
                    className={({ isActive }) =>
                        `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-blue-400 font-bold text-white' : 'bg-blue-200'
                        }`
                    }
                >
                    OnTransit
                </NavLink>

                <NavLink
                    to='/orders/delivered'
                    className={({ isActive }) =>
                        `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-red-400 font-bold text-white' : 'bg-red-200'
                        }`
                    }
                >
                    Delivered
                </NavLink>

                <NavLink
                    to='/orders/readyforpickup'
                    className={({ isActive }) =>
                        `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-red-400 font-bold text-white' : 'bg-red-200'
                        }`
                    }
                >
                    Ready For Pickup
                </NavLink>

                <NavLink
                    to='/orders/cancelled'
                    className={({ isActive }) =>
                        `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-red-400 font-bold text-white' : 'bg-red-200'
                        }`
                    }
                >
                    Cancelled
                </NavLink>


            </div>


          
        </div>
    );
};

export default Order;
