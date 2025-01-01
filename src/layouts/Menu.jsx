import { Outlet } from 'react-router';
import Menu from '../components/dashboard/Menu';

const MenuLayout = ({ children }) => {

    return (

        <div className='relative w-full h-auto'>

            <Menu />

            <div>
                <Outlet />
            </div>

        </div>

    );
};





export default MenuLayout;