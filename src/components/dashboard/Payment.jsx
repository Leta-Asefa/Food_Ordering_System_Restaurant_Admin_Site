import React from 'react';
import { NavLink } from 'react-router-dom';

const Payment = () => {

    return (
        <div className='sticky top-0 bg-orange-400'>
            <div className='flex flex-row justify-center gap-1 py-5'>

                <NavLink
                    to='/payment/history'
                    className={({ isActive }) =>
                        `w-24 text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-orange-400 font-bold text-white' : 'bg-orange-200'
                        }`
                    }
                >
                    History
                </NavLink>
                <NavLink
                    to='/payment/report'
                    className={({ isActive }) =>
                        `w-24 text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-green-400 font-bold text-white' : 'bg-green-200'
                        }`
                    }
                >
                    Report
                </NavLink>
                <NavLink
                    to='/payment/refund'
                    className={({ isActive }) =>
                        `w-24 text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-blue-400 font-bold text-white' : 'bg-blue-200'
                        }`
                    }
                >
                    Refund
                </NavLink>
                <NavLink
                    to='/payment/subscription'
                    className={({ isActive }) =>
                        `w-24 text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-red-400 font-bold text-white' : 'bg-red-200'
                        }`
                    }
                >
                    Subscription
                </NavLink>



            </div>


        </div>
    );
};

export default Payment;