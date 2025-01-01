import React from 'react';
import DisplayOrders from './DisplayOrders';

const Delivered = () => {
    const orders = [
        {
            id: '123456789',
            customerName: 'Abebe Kebede',
            customerContact: '0987654321',
            items: [
                { name: 'Beef Burger', quantity: 2 },
                { name: 'Coca Cola', quantity: 2 },
                { name: 'Pizza Burger', quantity: 1 },
            ],
            paymentStatus: 'Paid',
            total: 500,
            paymentMethod: 'Mobile Banking',
            deliveryAddress: 'Addis Ababa / Bole / Gurdshola / Efoyta / Street 128',
            deliveryPerson: 'Bekele Dessie',
        },
        {
            id: '987654321',
            customerName: 'Hanna Alemu',
            customerContact: '0976543210',
            items: [
                { name: 'Vegan Salad', quantity: 1 },
                { name: 'Orange Juice', quantity: 1 },
            ],
            paymentStatus: 'Pending',
            total: 150,
            paymentMethod: 'Cash on Delivery',
            deliveryAddress: 'Addis Ababa / CMC / Palm Street',
            deliveryPerson: 'N/A',
        }
    ];



    return (
        <div>
            <div className='flex flex-row justify-center items-center gap-5 py-2'>
                <input type='text' className='px-3 py-1 bg-orange-200 w-96 rounded-lg' />
                <img src='/search.svg' className='w-10 h-10 rounded-full' />
            </div>

            <div className='bg-gray-50 px-5 py-1 rounded-lg overflow-hidden text-xs  space-y-2'>
                {
                    orders.map(order => {
                        return <DisplayOrders order={order} />
                    })
                }
            </div>
        </div>
    );
};

export default Delivered;