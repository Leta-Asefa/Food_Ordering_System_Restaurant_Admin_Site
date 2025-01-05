import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';

const History = ({ }) => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [amountRange, setAmountRange] = useState({ min: 0, max: 1000 });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([])
  const { authUser } = useAuthUserContext()

  useEffect(() => {
    async function get() {
      const response = await axios.get(`http://localhost:4000/payment/restaurant/${authUser._id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      console.log(response.data)
      setData(response.data)

    }

    get()


  }, [])


  const filteredData = data.filter((payment) => {
    const paymentDate = new Date(payment.paymentDate).setHours(0, 0, 0, 0);
  const start = startDate ? new Date(startDate).setHours(0, 0, 0, 0) : null;
  const end = endDate ? new Date(endDate).setHours(23, 59, 59, 999) : null;

    return (
      (filterStatus ? payment.status === filterStatus : true) &&
      (filterMethod ? payment.paymentMethod === filterMethod : true) &&
      payment.amount >= amountRange.min &&
      payment.amount <= amountRange.max &&
      (!start || paymentDate >= start) &&
      (!end || paymentDate <= end)
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
            value={amountRange.min===0?'':amountRange.min}
            onChange={(e) =>
              setAmountRange({ ...amountRange, min: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Max Amount"
            className="border p-2"
            value={amountRange.max===1000?'':amountRange.max}
            onChange={(e) =>
              setAmountRange({ ...amountRange, max: Number(e.target.value) })
            }
          />

          <div className="flex space-x-2">
            <input
              type="date"
              className="border p-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              type="date"
              className="border p-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>


        </div>

      </div>

      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Order ID</th>
            <th className="border px-2 py-1">Customer</th>
            <th className="border px-2 py-1">Contact</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Payment Method</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((payment) => (
            <tr key={payment.orderId}>
              <td className="border px-2 py-1">{payment.orderId._id}</td>
              <td className="border px-2 py-1">{payment.userId.username}</td>
              <td className="border px-2 py-1">{payment.userId.phoneNumber}</td>
              <td className="border px-2 py-1">{payment.amount}</td>
              <td className="border px-2 py-1">{payment.paymentMethod}</td>
              <td className="border px-2 py-1">{payment.status}</td>
              <td className="border px-2 py-1">{new Date(payment.paymentDate).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};


export default History;




