import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaList, FaHourglassHalf, FaTruck, FaCheckCircle, FaTimesCircle, FaSearch } from 'react-icons/fa';

const Order = () => {

    const statuses=[
        { to: '/orders/all', label: 'All', icon: <FaList /> },
        { to: '/orders/pending', label: 'Pending', icon: <FaHourglassHalf /> },
        { to: '/orders/ontransit', label: 'On Transit', icon: <FaTruck /> },
        { to: '/orders/delivered', label: 'Delivered', icon: <FaCheckCircle /> },
        { to: '/orders/cancelled', label: 'Cancelled', icon: <FaTimesCircle /> }
    ]

    return (
        <div className="sticky top-0 bg-gray-100 shadow-md rounded-lg p-4 flex items-center justify-center gap-2">
                {statuses.map(({ to, label, icon }) => (
                    <NavLink
                        key={to}
                        to={to}
                        className={({ isActive }) => 
                            `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-md hover:opacity-80 
                            ${isActive ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'}`
                        }
                    >
                        <span className="w-4 h-4">{icon}</span>
                        {label}
                    </NavLink>
                ))}
         
        </div>
    );
};

export default Order;
