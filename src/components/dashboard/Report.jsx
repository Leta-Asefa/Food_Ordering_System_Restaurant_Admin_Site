import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthUserContext } from '../../contexts/AuthUserContext';

const Report = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { authUser } = useAuthUserContext();

    useEffect(() => {
        async function fetchData() {
            const start = formatTheDate(startDate?startDate:getCurrentDateForInput(), 's')
            const end = formatTheDate(endDate?endDate:getCurrentDateForInput(), 'e')
            const response = await axios.get(`http://localhost:4000/payment/restaurant/${authUser._id}/${start}/${end}`, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            setData(response.data);
        }
        fetchData();
    }, [startDate, endDate]);



    
    function getCurrentDateForInput() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const day = now.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const formatTheDate = (value, type) => {
        // Check if the value is a valid date
        const selectedDate = value;

        const formattedDate = new Date(selectedDate);


        // Based on the type, set the time
        if (type === 's') {
            // Set time for the start date (00:00:00.000)
            formattedDate.setHours(0, 0, 0, 0);
        } else if (type === 'e') {
            // Set time for the end date (23:59:59.999)
            formattedDate.setHours(23, 59, 59, 999);
        }

        // Convert to UTC and manually format the date to "YYYY-MM-DDTHH:mm:ss.sss+00:00"
        const year = formattedDate.getUTCFullYear();
        const month = (formattedDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = formattedDate.getUTCDate().toString().padStart(2, '0');
        const hours = formattedDate.getUTCHours().toString().padStart(2, '0');
        const minutes = formattedDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = formattedDate.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = formattedDate.getUTCMilliseconds().toString().padStart(3, '0');

        // Format the date string as per required format
        const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
        console.log(formattedDateString)
        return formattedDateString;
    };



    // Filter data by date range
    const filteredData = data.filter((payment) => {
        const paymentDate = new Date(payment.paymentDate).setHours(0, 0, 0, 0);
        const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
        const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

        return (!start || paymentDate >= start) && (!end || paymentDate <= end);
    });

    // Calculate summary data
    const totalIncome = filteredData.reduce((sum, payment) => sum + payment.amount, 0);
    const orderCount = filteredData.length;

    // Payment methods breakdown
    const paymentMethods = filteredData.reduce((acc, payment) => {
        acc[payment.paymentMethod] = (acc[payment.paymentMethod] || 0) + 1;
        return acc;
    }, {});

    // Most and least sold items
    const itemCount = {};

    // Count the quantity of each item
    filteredData.forEach((payment) => {
        payment.orderId.items.forEach((item) => {
            const itemName = item.item.name;
            itemCount[itemName] = (itemCount[itemName] || 0) + item.quantity;
        });
    });

    // Convert itemCount object to an array and sort by quantity
    const itemsArray = Object.entries(itemCount).sort((a, b) => b[1] - a[1]);

    const mostSoldItem = itemsArray[0];
    const leastSoldItem = itemsArray[itemsArray.length - 1];



    const locationCount = {};
    // Count the number of orders per address
    filteredData.forEach((payment) => {
        const address = payment.orderId.shippingAddress?.address || 'Unknown Address';
        locationCount[address] = (locationCount[address] || 0) + 1;
    });

    // Convert locationCount to an array and sort by the number of orders
    const locationArray = Object.entries(locationCount).sort((a, b) => b[1] - a[1]);

    const topLocations = locationArray.slice(0, 3);



    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Summary Report</h1>

            {/* Date Filters */}
            <div className="flex space-x-4 mb-6">
                <div>
                    <label className="block text-sm font-medium mb-1">Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">End Date</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="border p-2 rounded w-full"
                    />
                </div>
            </div>

            <div className='grid grid-cols-4 gap-5'>

                {/* Summary Report */}
                <div className="bg-gray-50 shadow-lg rounded-lg p-3 mb-6 col-span-2">
                    <h2 className="font-bold mb-4">Summary</h2>
                    <p className="">💰 Total Income: <strong>${totalIncome.toFixed(2)}</strong></p>
                    <p className="">📦 Total Orders: <strong>{orderCount}</strong></p>
                    <p className="">🏆 Most Sold Item: <strong>{mostSoldItem ? `${mostSoldItem[0]} (${mostSoldItem[1]} units)` : 'N/A'}</strong></p>
                    <p className="">🚩 Least Sold Item: <strong>{leastSoldItem ? `${leastSoldItem[0]} (${leastSoldItem[1]} units)` : 'N/A'}</strong></p>
                  


                </div>



                {/* Payment Methods Breakdown */}
                <div className="bg-gray-50 shadow-lg rounded-lg p-3 mb-6">
                    <h2 className=" font-bold mb-4 ">Payment Methods Breakdown</h2>
                    {Object.entries(paymentMethods).map(([method, count]) => (
                        <p key={method} className="flex flex-row gap-3 justify-start">
                            <h6 className='w-16 text-left'>{method}</h6>
                            <h6 className='w-5 text-left font-semibold'>{count}</h6>
                            <h6>payments</h6>

                        </p>
                    ))}
                </div>

                <div className='bg-gray-50 shadow-lg rounded-lg p-3 mb-6'>
                    <p className="font-bold">📍 Top Locations:</p>
                    <ul>
                        {topLocations.map(([location, count], index) => (
                            <li key={index} className="text-xs">
                                {index + 1}. {location} ({count} orders)
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
            {/* Order List */}
            <table className="min-w-full bg-white border">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Order ID</th>
                        <th className="border px-4 py-2">Customer</th>
                        <th className="border px-4 py-2">Amount</th>
                        <th className="border px-4 py-2">Payment Date</th>
                        <th className="border px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((payment) => (
                        <tr key={payment._id}>
                            <td className="border px-4 py-2">{payment.orderId._id}</td>
                            <td className="border px-4 py-2">{payment.userId.username}</td>
                            <td className="border px-4 py-2">${payment.amount.toFixed(2)}</td>
                            <td className="border px-4 py-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                            <td className="border px-4 py-2">{payment.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Report;
