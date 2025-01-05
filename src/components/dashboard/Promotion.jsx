import React from 'react';
import { NavLink } from 'react-router-dom';

const Promotion = () => {

    return (
        <div className='sticky top-0 bg-orange-400'>
            <div className='flex flex-row justify-center gap-3 py-5'>

                <NavLink
                    to='/promotion/create'
                    className={({ isActive }) =>
                        `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-orange-400 font-bold text-white' : 'bg-orange-200'
                        }`
                    }
                >
                    Create New
                </NavLink>
                <NavLink
                    to='/promotion/list'
                    className={({ isActive }) =>
                        `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-green-400 font-bold text-white' : 'bg-green-200'
                        }`
                    }
                >
                    Promotions List
                </NavLink>
                <NavLink
                    to='/promotion/underapplication'
                    className={({ isActive }) =>
                        `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-blue-400 font-bold text-white' : 'bg-blue-200'
                        }`
                    }
                >
                    Under Application
                </NavLink>
              



            </div>


        </div>
    );
};

export default Promotion;