import React from 'react';
import { FaList, FaPaperclip, FaPlus } from 'react-icons/fa';
import { IoFastFood } from 'react-icons/io5';
import { NavLink } from 'react-router-dom';

const Promotion = () => {

    const statuses=[
        { to: '/promotion/create', label: 'Create New', icon: <FaPlus/> },
        { to: '/promotion/list', label: 'Promotions List', icon: <FaList /> },
        { to: '/promotion/underapplication', label: 'Under Application', icon: <FaPaperclip /> },
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

export default Promotion;