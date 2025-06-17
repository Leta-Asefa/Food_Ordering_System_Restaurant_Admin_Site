import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';

const Subscription = () => {
    const [subscription, setSubscription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { authUser } = useAuthUserContext();

    useEffect(() => {
        async function fetchSubscription() {
            try {
                const res = await axios.get(`https://food-ordering-system-backend-xluu.onrender.com/subscription/restaurant/${authUser._id}`);
                setSubscription(res.data);
                setLoading(false);
                console.log("Subscription",res.data)
            } catch (err) {
                setError('Failed to fetch subscription');
                setLoading(false);
            }
        }
        fetchSubscription();
    }, []);

    const handlePay = async () => {
        try {
            const response = await axios.post(`https://food-ordering-system-backend-xluu.onrender.com/subscription/pay/${subscription._id}`,
                { phoneNumber: authUser.contact, name: authUser.name, restaurantId: authUser._id },
                { headers: { 'Content-Type': 'application/json' }, withCredentials: true });

            if (response.data.url) window.open(response.data.url, '_blank');
        } catch (err) {
            alert('Payment initiation failed, please try again later');
        }
    };

    if (loading) return <div className="p-4 text-center text-gray-500">Loading...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

    const startDate = new Date(subscription.startDate);
    const endDate = subscription.endDate ? new Date(subscription.endDate) : null;
    const today = new Date();
    let daysLeft = 0;

    if (endDate) {
        const diff = endDate.getTime() - today.setHours(0, 0, 0, 0);
        daysLeft = Math.max(Math.ceil(diff / (1000 * 60 * 60 * 24)), 0);
    }

    const getBadgeStyle = () => {
        if (daysLeft === 0) return 'bg-red-600 text-white';
        if (daysLeft === 1) return 'bg-red-500 text-white animate-pulse';
        if (daysLeft <= 7) return 'bg-yellow-400 text-black';
        return 'bg-green-100 text-green-800';
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📄 Subscription Overview</h2>

            <div className="space-y-4 text-gray-700">
                <div className="flex justify-between items-center">
                    <span className="font-medium">Status:</span>
                    <span className="capitalize">{subscription.status}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="font-medium">Amount:</span>
                    <span>{subscription.amount} ETB</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="font-medium">Start Date:</span>
                    <span>{startDate.toLocaleDateString()}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="font-medium">End Date:</span>
                    <span>{endDate ? endDate.toLocaleDateString() : 'N/A'}</span>
                </div>

                {subscription.status === 'Paid' && endDate && (
                    <div className="flex justify-between items-center">
                        <span className="font-medium">Days Left:</span>
                        <span className={`px-3 py-1 text-sm rounded-full font-semibold ${getBadgeStyle()}`}>
                            {daysLeft === 0 ? 'Expired' : `${daysLeft} day${daysLeft > 1 ? 's' : ''} left`}
                        </span>
                    </div>
                )}
            </div>

            {(subscription.status === 'Not Paid' || daysLeft === 0) && (
                <button
                    onClick={handlePay}
                    className="mt-6 w-full bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-xl transition duration-200"
                >
                    💳 Pay Now
                </button>
            )}

        </div>
    );
};

export default Subscription;
