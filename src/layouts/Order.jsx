import { Outlet } from 'react-router';
import Order from '../components/dashboard/Order';

const OrderLayout = ({ children }) => {

    return (

        <div className='relative w-full h-auto'>

            <Order />

            <div>
                <Outlet />
            </div>

        </div>

    );
};





export default OrderLayout;