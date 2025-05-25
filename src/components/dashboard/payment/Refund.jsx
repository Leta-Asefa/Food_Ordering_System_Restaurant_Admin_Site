import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';

const Refund = () => {
  const [refunds, setRefunds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const { authUser } = useAuthUserContext();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Search state
  const [searchText, setSearchText] = useState('');

  // Filtered refunds with search
  const filteredRefunds = refunds.filter(refund => {
    const search = searchText.toLowerCase();
    const fields = [
      refund.orderId?._id,
      refund.userId?.username,
      refund.userId?.phoneNumber,
      refund.location,
      refund.reason,
      refund.amount?.toString(),
    ];
    return fields.some(field => field && field.toString().toLowerCase().includes(search));
  });

  // Pagination on filtered refunds
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedRefunds = filteredRefunds.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRefunds.length / itemsPerPage);

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
    <div className="py-2 px-6">
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
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Refund Requests</h2>
      <div className="flex items-center mb-4 gap-2">
        <input
          type="text"
          className="border p-2 flex-1"
          placeholder="Search..."
          value={searchText}
          onChange={e => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
        <button
          className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
          onClick={() => {
            setSearchText('');
            setCurrentPage(1);
          }}
        >
          Clear Search
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-xl overflow-hidden">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr className='text-sm'>
              <th className="py-2 px-6 text-left">Order ID</th>
              <th className="py-2 px-6 text-left">Customer Name</th>
              <th className="py-2 px-6 text-left">Phone Number</th>
              <th className="py-2 px-6 text-left">Location</th>
              <th className="py-2 px-6 text-left">Reason</th>
              <th className="py-2 px-6 text-left">Requested At</th>
              <th className="py-2 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {paginatedRefunds.map((refund) => (
              <tr key={refund.orderId._id} className="border-b border-gray-200 hover:bg-gray-50 transition text-sm">
                <td className="py-1.5 px-6">{refund.orderId}</td>
                <td className="py-1.5 px-6">{refund.userId.username}</td>
                <td className="py-1.5 px-6">{refund.userId.phoneNumber}</td>
                <td className="py-1.5 px-6">{refund.location}</td>
                <td className="py-1.5 px-6">{refund.reason}</td>
                <td className="py-1.5 px-6">{refund.createdAt ? new Date(refund.createdAt).toLocaleString() : '-'}</td>
                <td className="py-1.5 px-6 text-center flex justify-center gap-2">
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
            {paginatedRefunds.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">No refund requests found.</td>
              </tr>
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
    </div>
  );
};

export default Refund;
