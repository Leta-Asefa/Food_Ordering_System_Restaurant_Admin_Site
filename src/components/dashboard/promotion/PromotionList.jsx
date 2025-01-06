import { useState, useEffect } from 'react';
import axios from 'axios';

const PromotionList = () => {
    const [promotions, setPromotions] = useState([]);
    const tiers = ['Platinum', 'Gold', 'Silver', 'Bronze', 'Basic'];
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get('http://localhost:4000/promotion/get');
                setPromotions(response.data);
            } catch (error) {
                console.error('Error fetching promotions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, []);

    const groupByDate = () => {
        const grouped = {};
        promotions.forEach(promo => {
            const dateKey = new Date(promo.date).toISOString().split('T')[0];
            if (!grouped[dateKey]) grouped[dateKey] = {};
            grouped[dateKey][promo.tier] = promo;
        });
        return grouped;
    };

    const groupedPromotions = groupByDate();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Promotion Availability</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Date</th>
                                {tiers.map((tier) => (
                                    <th key={tier} className="border p-2">{tier}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(groupedPromotions).map((date) => (
                                <tr key={date} className="border">
                                    <td className="border p-2 text-center font-semibold">{date}</td>
                                    {tiers.map((tier) => (
                                        <td key={tier} className="border p-2 text-center">
                                            {groupedPromotions[date][tier] ? (
                                                <span className="text-red-500">Booked  <span className='text-xs text-gray-600'>( {groupedPromotions[date][tier].restaurantId.name} )</span></span>
                                            ) : (
                                                <span className="text-green-500">Available</span>
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PromotionList;
