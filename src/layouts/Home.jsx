import { Outlet } from 'react-router';
import Navbar from '../partials/Navbar';

const HomeLayout = ({ children }) => {
  return (
    
     <div>
            <Navbar />
            <div className=' h-full'>

                <div className="bg-gray-200 h-auto col-span-1">
                    {/* <img src='home.jpg' className='w-full h-full' /> */}
                </div>

                <div className="bg-white col-span-2">
                 <Outlet/>
                </div>

            </div>
        </div>
    
  );
};

export default HomeLayout;