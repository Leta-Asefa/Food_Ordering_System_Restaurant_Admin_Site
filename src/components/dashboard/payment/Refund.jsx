import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';

const Refund = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { authUser } = useAuthUserContext();

  useEffect(() => {
    // Replace with your actual endpoint
    axios.get(`http://localhost:4000/payment/refundRequests/restaurant/${authUser._id}`)
      .then(res => {
        console.log("Refund", res.data);
        if (res.data.refunds) {
          setRefunds(res.data.refunds);
          setLoading(false);
        }
      })
      .catch(err => {
        console.error('Error fetching refund requests:', err);
        setLoading(false);
      });
  }, []);

  const handleApprove = (orderId, refundRequestId, amount) => {
    axios.get(`http://localhost:4000/payment/approveRefundRequest/${authUser.contact}/${authUser.name}/${amount}/${orderId}/${refundRequestId}`)
      .then(res => {
        if (res.data.checkout_url) {
          setModalContent(
            <div>
              <p className="mb-2">Checkout URL generated. Click below to proceed:</p>
              <a href={res.data.checkout_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Open Checkout</a>
            </div>
          );
        } else {
          setModalContent(res.data.message || "No response message");
        }
        setModalOpen(true);
      })
      .catch(err => {
        setModalContent("Error fetching refund requests: " + err.message);
        setModalOpen(true);
        console.error('Error fetching refund requests:', err);
      });
  };

  const handleDecline = (refundId) => {
    axios.get(`http://localhost:4000/payment/declineRefundRequest/${refundId}`)
      .then(res => {
        setModalContent(res.data.message || "No response message");
        setModalOpen(true);
      })
      .catch(err => {
        setModalContent("Error fetching refund requests: " + err.message);
        setModalOpen(true);
        console.error('Error fetching refund requests:', err);
      });
  };

  if (loading) return <p className="text-center text-gray-500">Loading refund requests...</p>;

  return (
    <div className="p-6">
      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[300px] max-w-[90vw]">
            <div className="mb-4">{modalContent}</div>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-full text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Requests</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">Order ID</th>
              <th className="py-3 px-6 text-left">Customer Name</th>
              <th className="py-3 px-6 text-left">Phone Number</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Reason</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {refunds.map((refund) => (
              <tr key={refund.orderId._id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                <td className="py-3 px-6">{refund.orderId}</td>
                <td className="py-3 px-6">{refund.userId.username}</td>
                <td className="py-3 px-6">{refund.userId.phoneNumber}</td>
                <td className="py-3 px-6">{refund.location}</td>
                <td className="py-3 px-6">{refund.reason}</td>
                <td className="py-3 px-6 text-center flex justify-center gap-2">
                  <button
                    onClick={() => handleApprove(refund.orderId, refund._id, refund.amount)}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-1 rounded-full text-xs shadow-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDecline(refund._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-1 rounded-full text-xs shadow-sm"
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
            {refunds.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-gray-500">No refund requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Refund;
