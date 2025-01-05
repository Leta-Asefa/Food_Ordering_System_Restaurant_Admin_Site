import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthUserContext } from '../../contexts/AuthUserContext';

const Sidebar = () => {

    const {authUser}=useAuthUserContext()

    return (
        <div className='px-2 py-5 bg-gray-200 h-screen'>
            <img src={authUser.image} className='w-16 h-16 object-cover mx-auto rounded-lg'/>
            <h6 className='text-xs text-center'>Hi <b>{authUser.name}'s</b> admin</h6>
            <div className='flex flex-row justify-center items-center'>
                <img src={authUser.isApproved?'verified.svg':'note.svg'}
                className='w-4 h-4'
                />
                <h6 className='text-xs'>{authUser.isApproved? 'Verified Company':'your application is underprocess.'}</h6>
            </div>
            <NavLink to="/dashboard" className="flex items-center p-2 space-x-3 hover:bg-gray-200 rounded">
                <img src='home.svg' className='w-8 h-8' />
                <span>Home</span>
            </NavLink>
            <NavLink to="/orders/all" className="flex items-center p-2 space-x-3 hover:bg-gray-200 rounded">
                <img src='order.svg' className='w-8 h-8' />
                <span>Orders</span>
            </NavLink>
            <NavLink to="/menu/food" className="flex items-center p-2 space-x-3 hover:bg-gray-200 rounded">
                <img src='menu.svg' className='w-8 h-8' />
                <span>Menu</span>
            </NavLink>
            <NavLink to="/promotion" className="flex items-center p-2 space-x-3 hover:bg-gray-200 rounded">
                <img src='promotion.svg' className='w-8 h-8' />
                <span>Promotions</span>
            </NavLink>
            <NavLink to="/report" className="flex items-center p-2 space-x-3 hover:bg-gray-200 rounded">
                <img src='report.svg' className='w-8 h-8' />
                <span>Reports</span>
            </NavLink>
            <NavLink to="/profile" className="flex items-center p-2 space-x-3 hover:bg-gray-200 rounded">
            <img src='profile.svg' className='w-8 h-8'/>
            <span>Profile</span>
            </NavLink>
            <NavLink to="/payment/history" className="flex items-center p-2 space-x-3 hover:bg-gray-200 rounded">
                <img src='payment.svg' className='w-8 h-8' />
                <span>Payment</span>
            </NavLink>

            <NavLink to="/adddeliveryperson" className="flex items-center p-2 space-x-3 hover:bg-gray-200 rounded">
                <img src='logout.svg' className='w-8 h-8' />
                <span>Add Delivery Person</span>
            </NavLink>

            <NavLink to="/logout" className="flex items-center p-2 space-x-3 hover:bg-gray-200 rounded">
                <img src='logout.svg' className='w-8 h-8' />
                <span>Logout</span>
            </NavLink>
        </div>
    );
};

export default Sidebar;