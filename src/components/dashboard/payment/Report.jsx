import React, { useState } from 'react';

const Report = ({  }) => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [amountRange, setAmountRange] = useState({ min: 0, max: 1000 });
  const data = [
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

  const filteredData = data.filter((payment) => {
    return (
      (filterStatus ? payment.status === filterStatus : true) &&
      (filterMethod ? payment.paymentMethod === filterMethod : true) &&
      payment.amount >= amountRange.min &&
      payment.amount <= amountRange.max
    );
  });

  return (
    <div className="container mx-auto p-1 overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4">Payment Reports</h1>

      <div className="flex space-x-4 mb-4">
        <select
          className="border p-2"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
          <option value="Refunded">Refunded</option>
        </select>

        <select
          className="border p-2"
          value={filterMethod}
          onChange={(e) => setFilterMethod(e.target.value)}
        >
          <option value="">All Methods</option>
          <option value="Card">Card</option>
          <option value="UPI">UPI</option>
          <option value="Cash">Cash</option>
          <option value="Wallet">Wallet</option>
        </select>

        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Amount"
            className="border p-2"
            value={amountRange.min}
            onChange={(e) =>
              setAmountRange({ ...amountRange, min: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Max Amount"
            className="border p-2"
            value={amountRange.max}
            onChange={(e) =>
              setAmountRange({ ...amountRange, max: Number(e.target.value) })
            }
          />
        </div>
      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Order ID</th>
            <th className="border px-2 py-1">User ID</th>
            <th className="border px-2 py-1">Restaurant ID</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Payment Method</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Transaction ID</th>
            <th className="border px-2 py-1">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((payment) => (
            <tr key={payment.orderId}>
              <td className="border px-2 py-1">{payment.orderId}</td>
              <td className="border px-2 py-1">{payment.userId}</td>
              <td className="border px-2 py-1">{payment.restaurantId}</td>
              <td className="border px-2 py-1">{payment.amount}</td>
              <td className="border px-2 py-1">{payment.paymentMethod}</td>
              <td className="border px-2 py-1">{payment.status}</td>
              <td className="border px-2 py-1">{payment.transactionId}</td>
              <td className="border px-2 py-1">{new Date(payment.paymentDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default Report;




