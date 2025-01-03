import React from 'react';
import { NavLink } from 'react-router-dom';

const Menu = () => {
   
    return (
        <div className='flex flex-row justify-center py-7 bg-orange-500 sticky top-0'>
          
                       <NavLink
                              to='/menu/additem'
                              className={({ isActive }) =>
                                  `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-gray-400 font-bold text-white ' : 'bg-gray-100'
                                  }`
                              }
                          >
                              Add New
                          </NavLink>
                          <NavLink
                              to='/menu/food'
                              className={({ isActive }) =>
                                  `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-orange-400 font-bold text-white' : 'bg-orange-200'
                                  }`
                              }
                          >
                              Food
                          </NavLink>
                          <NavLink
                              to='/menu/drink'
                              className={({ isActive }) =>
                                  `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-green-400 font-bold text-white' : 'bg-green-200'
                                  }`
                              }
                          >
                              Drink
                          </NavLink>
                          <NavLink
                              to='/menu/catering'
                              className={({ isActive }) =>
                                  `w-auto text-center rounded-lg px-4 py-1 hover:opacity-70 ${isActive ? 'bg-green-400 font-bold text-white' : 'bg-green-200'
                                  }`
                              }
                          >
                              Catering Packages
                          </NavLink>
          
          
                   
          

        </div>
    );
};

export default Menu;