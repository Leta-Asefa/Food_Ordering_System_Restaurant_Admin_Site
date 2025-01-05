import { Outlet } from 'react-router';
import Promotion from '../components/dashboard/Promotion';

const PromotionLayout = ({ children }) => {

    return (

        <div className='relative w-full h-auto'>

            <Promotion />

            <div>
                <Outlet />
            </div>

        </div>

    );
};





export default PromotionLayout;