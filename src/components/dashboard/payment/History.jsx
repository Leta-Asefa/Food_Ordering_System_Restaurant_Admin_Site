import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';

const History = ({ }) => {
  const [filterStatus, setFilterStatus] = useState('');
  const [filterMethod, setFilterMethod] = useState('');
  const [amountRange, setAmountRange] = useState({ min: 0, max: 1000 });
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);
  const { authUser } = useAuthUserContext();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    async function get() {
      const response = await axios.get(`https://food-ordering-system-backend-xluu.onrender.com/payment/restaurant/${authUser._id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      // Discard items where orderId is empty
      const filtered = response.data.filter(payment => payment.orderId);
      setData(filtered);
    }

    get();
  }, []);

  // Only filter if data is not empty
  const filteredData = data && data.length > 0 ? data.filter((payment) => {
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
  }) : [];

  // Calculate paginated data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedData = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

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
          <option value="Paid">Paid</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Refunded">Refunded</option>
        </select>

        <div className="flex space-x-2">
          <input
            type="number"
            placeholder="Min Amount"
            className="border p-2"
            value={amountRange.min === 0 ? '' : amountRange.min}
            onChange={(e) =>
              setAmountRange({ ...amountRange, min: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Max Amount"
            className="border p-2"
            value={amountRange.max === 1000 ? '' : amountRange.max}
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
            <button
              className="ml-2 px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
              onClick={() => {
                setFilterStatus('');
                setFilterMethod('');
                setAmountRange({ min: 0, max: 1000 });
                setStartDate('');
                setEndDate('');
                setCurrentPage(1);
              }}
            >
              Clear All Filters
            </button>
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
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-gray-500">no history</td>
            </tr>
          ) : (
            paginatedData.map((payment) => (
              <tr key={payment.orderId}>
                <td className="border px-2 py-1">{payment.orderId?._id}</td>
                <td className="border px-2 py-1">{payment.userId?.username}</td>
                <td className="border px-2 py-1">{payment.userId?.phoneNumber}</td>
                <td className="border px-2 py-1">{payment.amount}</td>
                <td className="border px-2 py-1">{payment.paymentMethod}</td>
                <td className="border px-2 py-1">{payment.status}</td>
                <td className="border px-2 py-1">{new Date(payment.paymentDate).toLocaleString()}</td>
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

export default History;




