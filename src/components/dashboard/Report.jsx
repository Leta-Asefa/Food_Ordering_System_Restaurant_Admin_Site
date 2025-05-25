import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthUserContext } from '../../contexts/AuthUserContext';

const Report = () => {
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const { authUser } = useAuthUserContext();

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        async function fetchData() {
            const start = formatTheDate(startDate ? startDate : getCurrentDateForInput(), 's');
            const end = formatTheDate(endDate ? endDate : getCurrentDateForInput(), 'e');
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
        const selectedDate = value;
        const formattedDate = new Date(selectedDate);

        if (type === 's') {
            formattedDate.setHours(0, 0, 0, 0);
        } else if (type === 'e') {
            formattedDate.setHours(23, 59, 59, 999);
        }

        const year = formattedDate.getUTCFullYear();
        const month = (formattedDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = formattedDate.getUTCDate().toString().padStart(2, '0');
        const hours = formattedDate.getUTCHours().toString().padStart(2, '0');
        const minutes = formattedDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = formattedDate.getUTCSeconds().toString().padStart(2, '0');
        const milliseconds = formattedDate.getUTCMilliseconds().toString().padStart(3, '0');

        const formattedDateString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}+00:00`;
        console.log(formattedDateString);
        return formattedDateString;
    };

    const filteredData = data.filter((payment) => {
        const paymentDate = new Date(payment.paymentDate).setHours(0, 0, 0, 0);
        const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
        const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

        return (!start || paymentDate >= start) && (!end || paymentDate <= end);
    });

    const totalIncome = filteredData.reduce((sum, payment) => sum + payment.amount, 0);
    const orderCount = filteredData.length;

    const paymentMethods = filteredData.reduce((acc, payment) => {
        acc[payment.paymentMethod] = (acc[payment.paymentMethod] || 0) + 1;
        return acc;
    }, {});

    const itemCount = {};

    filteredData.forEach((payment) => {
        payment.orderId.items.forEach((item) => {
            const itemName = item.item.name;
            itemCount[itemName] = (itemCount[itemName] || 0) + item.quantity;
        });
    });

    const itemsArray = Object.entries(itemCount).sort((a, b) => b[1] - a[1]);

    const mostSoldItem = itemsArray[0];
    const leastSoldItem = itemsArray[itemsArray.length - 1];

    const locationCount = {};
    filteredData.forEach((payment) => {
        const address = payment.orderId.shippingAddress?.address || 'Unknown Address';
        locationCount[address] = (locationCount[address] || 0) + 1;
    });

    const locationArray = Object.entries(locationCount).sort((a, b) => b[1] - a[1]);

    const topLocations = locationArray.slice(0, 3);

    // Calculate paginated data
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Summary Report</h1>

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

            <div className="grid grid-cols-4 gap-5">
                <div className="bg-gray-50 shadow-lg rounded-lg p-3 mb-6 col-span-2">
                    <h2 className="font-bold mb-4">Summary</h2>
                    <p className="">💰 Total Income: <strong>${totalIncome.toFixed(2)}</strong></p>
                    <p className="">📦 Total Orders: <strong>{orderCount}</strong></p>
                    <p className="">🏆 Most Sold Item: <strong>{mostSoldItem ? `${mostSoldItem[0]} (${mostSoldItem[1]} units)` : 'N/A'}</strong></p>
                    <p className="">🚩 Least Sold Item: <strong>{leastSoldItem ? `${leastSoldItem[0]} (${leastSoldItem[1]} units)` : 'N/A'}</strong></p>
                </div>

                <div className="bg-gray-50 shadow-lg rounded-lg p-3 mb-6">
                    <h2 className="font-bold mb-4">Payment Methods Breakdown</h2>
                    {Object.entries(paymentMethods).map(([method, count]) => (
                        <p key={method} className="flex flex-row gap-3 justify-start">
                            <h6 className="w-16 text-left">{method}</h6>
                            <h6 className="w-5 text-left font-semibold">{count}</h6>
                            <h6>payments</h6>
                        </p>
                    ))}
                </div>

                <div className="bg-gray-50 shadow-lg rounded-lg p-3 mb-6">
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
                    {paginatedData.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500">No data, no report</td>
                        </tr>
                    ) : (
                        paginatedData.map((payment) => (
                            <tr key={payment._id}>
                                <td className="border px-4 py-2">{payment.orderId._id}</td>
                                <td className="border px-4 py-2">{payment.userId.username}</td>
                                <td className="border px-4 py-2">${payment.amount.toFixed(2)}</td>
                                <td className="border px-4 py-2">{new Date(payment.paymentDate).toLocaleDateString()}</td>
                                <td className="border px-4 py-2">{payment.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 space-x-2">
                    <button
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default Report;
