import React from 'react';
import { FaHistory, FaMoneyBill } from 'react-icons/fa';
import { MdPayment, MdSubscriptions } from 'react-icons/md';
import { NavLink } from 'react-router-dom';

const Payment = () => {

       const statuses=[
            { to: '/payment/history', label: 'History', icon: <FaHistory /> },
            { to: '/payment/refund', label: 'Refund Requests', icon: <FaMoneyBill /> },
            { to: '/payment/subscription', label: 'Subscription', icon: <MdPayment /> },
        ]

    return (
           <div className="sticky top-0 px-4 pt-2 pb-4 bg-gray-50 shadow-sm flex items-center  justify-center gap-2">
                   {statuses.map(({ to, label, icon }) => (
                       <NavLink
                           key={to}
                           to={to}
                           className={({ isActive }) => 
                               `flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 shadow-md hover:opacity-80
                               ${isActive ? 'bg-gray-700 text-white' : 'bg-gray-300 text-gray-800'}`
                           }
                       >
                           <span className="w-4 h-4">{icon}</span>
                           <span className='text-sm'>{label} </span>
                       </NavLink>
                   ))}
            
           </div>
       );
};

export default Payment;