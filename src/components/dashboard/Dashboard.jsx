import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, Legend } from 'recharts';
import { useAuthUserContext } from '../../contexts/AuthUserContext';

const Dashboard = () => {
  const [summary, setSummary] = useState(null);
  const [days, setDays] = useState(30);
  const { authUser } = useAuthUserContext();

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`https://food-ordering-system-backend-xluu.onrender.com/restaurant/summary/${authUser._id}/${days}`);
      setSummary(response.data);
    } catch (error) {
      console.error('Failed to fetch dashboard summary', error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [days]);

  if (!summary) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Styled Days Input Header */}
      <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        <div className="flex items-center gap-4">
          <label htmlFor="days" className="text-lg font-semibold text-gray-700">For the past:</label>
          <input
            id="days"
            type="number"
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-24 p-2 border border-gray-300 rounded-md text-lg font-medium text-gray-700"
          /> 
          <span className="text-lg font-semibold">days</span>
        </div>
        <button
          onClick={fetchSummary}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Refresh
        </button>
      </div>

      {/* Graphs */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Orders Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={summary.ordersOverTime}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="count" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Income Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={summary.incomeOverTime}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
              <Line type="monotone" dataKey="income" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800">Total Orders</h3>
          <p className="text-2xl font-bold">{summary.totalOrders}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800">Total Income</h3>
          <p className="text-2xl font-bold">ETB {summary.totalIncome.toFixed(2)}</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-4">
          <h3 className="text-lg font-semibold text-gray-800">Refunds</h3>
          <p className="text-sm">{summary.refundCount} refunds</p>
          <p className="text-2xl font-bold">ETB {summary.refundTotal}</p>
        </div>
      </div>

      {/* Top Sales */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Top Sales</h2>
        <ul className="space-y-2">
          {summary.topSales.map((item, index) => (
            <li key={index} className="flex justify-between text-gray-700">
              <span>{item.itemName}</span>
              <span className="font-semibold">{item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Order Status Distribution */}
      <div className="bg-white shadow-lg rounded-lg p-4">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Order Status Distribution</h2>
        <ul className="space-y-2">
          {Object.entries(summary.orderStatusDistribution).map(([status, count]) => (
            <li key={status} className="flex justify-between text-gray-700">
              <span>{status}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
