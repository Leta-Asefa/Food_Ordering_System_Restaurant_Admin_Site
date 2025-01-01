import React from 'react';
import DisplayOrders from './DisplayOrders';

const OnTransit = () => {
   
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
        },
        {
            id: '112233445',
            customerName: 'Samuel Getachew',
            customerContact: '0998765432',
            items: [
                { name: 'Spaghetti', quantity: 3 },
                { name: 'Garlic Bread', quantity: 2 },
            ],
            paymentStatus: 'On Transit',
            total: 400,
            paymentMethod: 'Credit Card',
            deliveryAddress: 'Addis Ababa / Saris / Alpha Building',
            deliveryPerson: 'Abel Tadesse',
        },
        {
            id: '556677889',
            customerName: 'Martha Bekele',
            customerContact: '0912345678',
            items: [
                { name: 'Cheeseburger', quantity: 1 },
                { name: 'French Fries', quantity: 1 },
                { name: 'Milkshake', quantity: 1 },
            ],
            paymentStatus: 'Delivered',
            total: 300,
            paymentMethod: 'Mobile Banking',
            deliveryAddress: 'Addis Ababa / Bole / Olympia',
            deliveryPerson: 'Samuel Tesfaye',
        },
        {
            id: '998877665',
            customerName: 'Dereje Zewdu',
            customerContact: '0938765432',
            items: [
                { name: 'Doro Wot', quantity: 2 },
            ],
            paymentStatus: 'Pending',
            total: 200,
            paymentMethod: 'Cash on Delivery',
            deliveryAddress: 'Addis Ababa / Lideta / Gabon Street',
            deliveryPerson: 'N/A',
        },
        {
            id: '667788990',
            customerName: 'Sofia Teshome',
            customerContact: '0911223344',
            items: [
                { name: 'Coffee', quantity: 3 },
                { name: 'Cake Slice', quantity: 2 },
            ],
            paymentStatus: 'Paid',
            total: 100,
            paymentMethod: 'Mobile Banking',
            deliveryAddress: 'Addis Ababa / 22 / Near Kaldis',
            deliveryPerson: 'Mekdes Eshetu',
        },
        {
            id: '445566778',
            customerName: 'Yohannes Alemayehu',
            customerContact: '0922334455',
            items: [
                { name: 'Burger Combo', quantity: 1 },
            ],
            paymentStatus: 'On Transit',
            total: 150,
            paymentMethod: 'Credit Card',
            deliveryAddress: 'Addis Ababa / Megenagna / Sunrise Complex',
            deliveryPerson: 'Kalkidan Abebe',
        },
        {
            id: '334455667',
            customerName: 'Helen Wolde',
            customerContact: '0933445566',
            items: [
                { name: 'Pasta Alfredo', quantity: 1 },
                { name: 'Garlic Bread', quantity: 1 },
            ],
            paymentStatus: 'Delivered',
            total: 350,
            paymentMethod: 'Mobile Banking',
            deliveryAddress: 'Addis Ababa / Gotera / XYZ Street',
            deliveryPerson: 'Daniel Mesfin',
        },
        {
            id: '778899001',
            customerName: 'Kibrom Gebremedhin',
            customerContact: '0944556677',
            items: [
                { name: 'Tacos', quantity: 3 },
            ],
            paymentStatus: 'Pending',
            total: 120,
            paymentMethod: 'Cash on Delivery',
            deliveryAddress: 'Addis Ababa / Mexico / Abnet',
            deliveryPerson: 'N/A',
        },
        {
            id: '223344556',
            customerName: 'Meron Hailu',
            customerContact: '0988776655',
            items: [
                { name: 'Injera Firfir', quantity: 2 },
                { name: 'Tea', quantity: 1 },
            ],
            paymentStatus: 'Paid',
            total: 80,
            paymentMethod: 'Mobile Banking',
            deliveryAddress: 'Addis Ababa / Lafto / Near Mall',
            deliveryPerson: 'Bereket Solomon',
        },
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

export default OnTransit;