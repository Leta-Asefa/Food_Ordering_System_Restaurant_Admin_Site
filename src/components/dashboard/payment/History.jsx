import React, { useState, useEffect } from 'react';

const History = () => {
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const [status, setStatus] = useState('');
    const [method, setMethod] = useState('');
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');

    // Sample data
    useEffect(() => {
        const samplePayments = [
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b1b",
                "userId": "Jane Smith",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b1d",
                "amount": 30.0,
                "paymentMethod": "UPI",
                "status": "Pending",
                "transactionId": "txn_002",
                "paymentDate": "2024-12-26T13:20:45Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b1c",
                "userId": "Alice Johnson",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b1e",
                "amount": 45.75,
                "paymentMethod": "Cash",
                "status": "Completed",
                "transactionId": "txn_003",
                "paymentDate": "2024-12-27T14:15:30Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b1d",
                "userId": "Bob Brown",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b1f",
                "amount": 20.0,
                "paymentMethod": "Wallet",
                "status": "Failed",
                "transactionId": "txn_004",
                "paymentDate": "2024-12-28T15:10:25Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b1e",
                "userId": "Chris Davis",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b20",
                "amount": 55.25,
                "paymentMethod": "Card",
                "status": "Refunded",
                "transactionId": "txn_005",
                "paymentDate": "2024-12-29T16:05:20Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b1f",
                "userId": "Dana White",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b21",
                "amount": 75.5,
                "paymentMethod": "UPI",
                "status": "Completed",
                "transactionId": "txn_006",
                "paymentDate": "2024-12-30T17:00:15Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b20",
                "userId": "Eli Martinez",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b22",
                "amount": 35.0,
                "paymentMethod": "Cash",
                "status": "Pending",
                "transactionId": "txn_007",
                "paymentDate": "2024-12-31T18:55:10Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b21",
                "userId": "Fay Thomas",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b23",
                "amount": 40.0,
                "paymentMethod": "Wallet",
                "status": "Completed",
                "transactionId": "txn_008",
                "paymentDate": "2025-01-01T19:50:05Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b22",
                "userId": "George Walker",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b24",
                "amount": 50.0,
                "paymentMethod": "Card",
                "status": "Failed",
                "transactionId": "txn_009",
                "paymentDate": "2025-01-02T20:45:00Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b23",
                "userId": "Hana Lee",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b25",
                "amount": 60.0,
                "paymentMethod": "UPI",
                "status": "Refunded",
                "transactionId": "txn_010",
                "paymentDate": "2025-01-03T21:40:55Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b24",
                "userId": "Ian Campbell",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b26",
                "amount": 65.75,
                "paymentMethod": "Cash",
                "status": "Completed",
                "transactionId": "txn_011",
                "paymentDate": "2025-01-04T22:35:50Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b25",
                "userId": "Jack Young",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b27",
                "amount": 70.0,
                "paymentMethod": "Wallet",
                "status": "Pending",
                "transactionId": "txn_012",
                "paymentDate": "2025-01-05T23:30:45Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b26",
                "userId": "Kate Hall",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b28",
                "amount": 80.0,
                "paymentMethod": "Card",
                "status": "Completed",
                "transactionId": "txn_013",
                "paymentDate": "2025-01-06T00:25:40Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b27",
                "userId": "Leo King",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b29",
                "amount": 85.5,
                "paymentMethod": "UPI",
                "status": "Failed",
                "transactionId": "txn_014",
                "paymentDate": "2025-01-07T01:20:35Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b28",
                "userId": "Mia Adams",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b30",
                "amount": 90.25,
                "paymentMethod": "Cash",
                "status": "Refunded",
                "transactionId": "txn_015",
                "paymentDate": "2025-01-08T02:15:30Z"
            },
            {
                "orderId": "60c72b2f9b1d8e3a4c8e4b29",
                "userId": "Noah Baker",
                "restaurantId": "60c72b2f9b1d8e3a4c8e4b31",
                "amount": 95.0,
                "paymentMethod": "Wallet",
                "status": "Completed",
                "transactionId": "txn_016",
                "paymentDate": "2025-01-09T03:10:25Z"
            }
        ]

        setPayments(samplePayments);
        setFilteredPayments(samplePayments);
    }, []);

    const handleFilter = () => {
        let filtered = payments;

        if (status) {
            filtered = filtered.filter(payment => payment.status === status);
        }
        if (method) {
            filtered = filtered.filter(payment => payment.paymentMethod === method);
        }
        if (minAmount) {
            filtered = filtered.filter(payment => payment.amount >= parseFloat(minAmount));
        }
        if (maxAmount) {
            filtered = filtered.filter(payment => payment.amount <= parseFloat(maxAmount));
        }

        setFilteredPayments(filtered);
    };

    return (
        <div className="pl-3 overflow-x-hidden ">
            <h1 className="text-2xl font-bold mb-2">Payment History</h1>
            <div className="mb-2 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block mb-1 text-xs">Status</label>
                    <select
                        value={status}
                        onChange={e => setStatus(e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                    >
                        <option value="">All</option>
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-xs">Payment Method</label>
                    <select
                        value={method}
                        onChange={e => setMethod(e.target.value)}
                        className="w-full p-1 border border-gray-300 rounded"
                    >
                        <option value="">All</option>
                        <option value="Card">Card</option>
                        <option value="UPI">UPI</option>
                        <option value="Cash">Cash</option>
                        <option value="Wallet">Wallet</option>
                    </select>
                </div>
                <div>
                    <label className="block mb-1 text-xs">Amount Range</label>
                    <div className="flex space-x-2">
                        <input
                            type="number"
                            placeholder="Min"
                            value={minAmount}
                            onChange={e => setMinAmount(e.target.value)}
                            className="w-24 p-1 border border-gray-300 rounded"
                        />
                        <input
                            type="number"
                            placeholder="Max"
                            value={maxAmount}
                            onChange={e => setMaxAmount(e.target.value)}
                            className="w-24 p-1 border border-gray-300 rounded"
                        />

                        <button
                            onClick={handleFilter}
                            className="mb-4 rounded flex flex-row justify-center items-center"
                        >
                            <img src='/search.svg' className='w-10 h-5' />
                            <h6>search</h6>
                        </button>
                    </div>

                </div>

            </div>

            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-1 px-2 border-b">Order ID</th>
                        <th className="py-1 px-2 border-b">User</th>
                        <th className="py-1 px-2 border-b">Restaurant ID</th>
                        <th className="py-1 px-2 border-b">Amount</th>
                        <th className="py-1 px-2 border-b">Payment Method</th>
                        <th className="py-1 px-2 border-b">Status</th>
                        <th className="py-1 px-2 border-b">Transaction ID</th>
                        <th className="py-1 px-2 border-b">Payment Date</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredPayments.map(payment => (
                        <tr key={payment.transactionId}>
                            <td className="py-1 px-2 border-b">{payment.orderId}</td>
                            <td className="py-1 px-2 border-b">{payment.userId}</td>
                            <td className="py-1 px-2 border-b">{payment.restaurantId}</td>
                            <td className="py-1 px-2 border-b">${payment.amount.toFixed(2)}</td>
                            <td className="py-1 px-2 border-b">{payment.paymentMethod}</td>
                            <td className="py-1 px-2 border-b">{payment.status}</td>
                            <td className="py-1 px-2 border-b">{payment.transactionId}</td>
                            <td className="py-1 px-2 border-b">
                                {new Date(payment.paymentDate).toLocaleString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default History;
