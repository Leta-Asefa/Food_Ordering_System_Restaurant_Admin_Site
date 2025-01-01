import React, { useState } from 'react';

const Refund = () => {
  const [orderId, setOrderId] = useState('');
  const [refundReason, setRefundReason] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleRefund = async () => {
  
    console.log(refundReason,orderId)
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Process Refund</h1>
      
      {statusMessage && (
        <div className={`mb-4 p-2 text-white ${statusMessage.includes('Error') ? 'bg-red-500' : 'bg-green-500'}`}>
          {statusMessage}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="orderId" className="block text-gray-700 font-bold mb-2">
          Order ID
        </label>
        <input
          id="orderId"
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="refundReason" className="block text-gray-700 font-bold mb-2">
          Reason for Refund
        </label>
        <textarea
          id="refundReason"
          placeholder="Enter reason for refund"
          value={refundReason}
          onChange={(e) => setRefundReason(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        onClick={handleRefund}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Process Refund
      </button>
    </div>
  );
};

export default Refund;
