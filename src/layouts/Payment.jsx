import { Outlet } from 'react-router';
import Payment from '../components/dashboard/Payment';

const PaymentLayout = ({ children }) => {

    return (

        <div className='relative w-full h-auto'>

            <Payment />

            <div>
                <Outlet />
            </div>

        </div>

    );
};





export default PaymentLayout;