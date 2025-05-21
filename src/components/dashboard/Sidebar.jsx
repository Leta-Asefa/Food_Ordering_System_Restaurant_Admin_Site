import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuthUserContext } from '../../contexts/AuthUserContext';
import { CgProfile } from 'react-icons/cg';
import { MdMenuBook, MdPayments } from 'react-icons/md';
import { GrOrderedList } from 'react-icons/gr';
import { TbHomeFilled } from 'react-icons/tb';
import { GiKnightBanner } from 'react-icons/gi';
import { GoGraph } from 'react-icons/go';
import { CiDeliveryTruck } from 'react-icons/ci';
import { RiLogoutBoxFill } from 'react-icons/ri';
import axios from 'axios';

const Sidebar = () => {

    const { authUser } = useAuthUserContext()

    const handleLogout = async () => {
        try {
            await axios.get('http://localhost:4000/restaurant/logout', { withCredentials: true });
            // Optionally clear local storage or context here
            console.log('User logged out');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <div className='px-2 py-5 bg-gray-900 h-screen'>
            <h6 className='text-xs text-center text-white'>Welcome <b>{authUser?.name}'s</b> admin</h6>
            <img src={authUser?.image} className='w-16 h-16 object-cover mx-auto rounded-lg' />
            <div className='flex flex-row justify-center items-center mb-5'>
                <img src={authUser.isApproved ? '/verified.svg' : '/note.svg'}
                    className='w-4 h-4'
                />
                <h6 className='text-xs text-white'>{authUser.isApproved ? 'Verified Company' : 'your application is underprocess.'}</h6>
            </div>
            <NavLink to="/dashboard" className="flex items-center p-2 space-x-3 hover:bg-gray-800 rounded">
            <TbHomeFilled className='text-white w5 h-5'/>
            <span className='text-white text-sm'>Home</span>
            </NavLink>
            <NavLink to="/orders/all" className="flex items-center p-2 space-x-3 hover:bg-gray-800 rounded">
            <GrOrderedList className='text-white w5 h-5'/>
                <span className='text-white text-sm'>Orders</span>
            </NavLink>
            <NavLink to="/menu/food" className="flex items-center p-2 space-x-3 hover:bg-gray-800 rounded">
              <MdMenuBook className='text-white'/>
                <span className='text-white text-sm'>Menu</span>
            </NavLink>
            <NavLink to="/promotion/create" className="flex items-center p-2 space-x-3 hover:bg-gray-800 rounded">
            <GiKnightBanner className='text-white w5 h-5'/>
                <span className='text-white text-sm'>Promotions</span>
            </NavLink>
            <NavLink to="/report" className="flex items-center p-2 space-x-3 hover:bg-gray-800 rounded">
            <GoGraph className='text-white w5 h-5'/>
                <span className='text-white text-sm'>Reports</span>
            </NavLink>
            <NavLink to="/payment/refund" className="flex items-center p-2 space-x-3 hover:bg-gray-800 rounded">
            <MdPayments className='text-white w5 h-5'/>
                <span className='text-white text-sm'>Payment</span>
            </NavLink>
            <NavLink to="/profile" className="flex items-center p-2 space-x-3 hover:bg-gray-800 rounded">
            <CgProfile className='text-white w5 h-5'/>
                <span className='text-white text-sm'>Profile</span>
            </NavLink>

            <NavLink to="/login" className="flex items-center p-2 space-x-3 hover:bg-gray-800 rounded">
            <RiLogoutBoxFill className='text-white w5 h-5'/>
            <button className='text-white text-sm' onClick={handleLogout}>Logout</button>
            </NavLink>
        </div>
    );
};

export default Sidebar;