import { Outlet } from 'react-router';
import Sidebar from '../components/dashboard/Sidebar';

const DashboardLayout = ({ children }) => {
    return (

        <div className='grid grid-cols-12'>

            <div className="col-span-2">
                <Sidebar />
            </div>

            <div className="col-span-10 max-h-screen overflow-scroll">
                <Outlet/>
            </div>

        </div>

    );
};

export default DashboardLayout;