import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';


const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dpavrc7wd/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';


const UnderApplication = ({ restaurantId }) => {
    const [promotions, setPromotions] = useState([]);
    const [loading, setLoading] = useState(true);
    const { authUser } = useAuthUserContext();
    const [editingPromo, setEditingPromo] = useState(null);
    const [editValues, setEditValues] = useState({});
    const [price, setPrice] = useState({})

    useEffect(() => {
        const fetch = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/promotion/tier/pricelist`);
                if (response.data.price)
                    setPrice(response.data.price)
            } catch (error) {
                console.error('Error fetching promotions tier price list:', error);
            }
        };

        fetch();
    }, []);

    useEffect(() => {
        const fetchPromotions = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/promotion/${authUser._id}`);
                setPromotions(response.data.sort((a, b) => new Date(b.date) - new Date(a.date))); // Sort latest first
            } catch (error) {
                console.error('Error fetching promotions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPromotions();
    }, [restaurantId]);

    const handlePay = async (promotionId, tier) => {
        const amount = Number(price[tier])
        const paymentInfo = { phoneNumber: authUser.contact, amount: amount, firstName: authUser.name, promotionId };

        try {
            const response = await axios.post('http://localhost:4000/payment/test', paymentInfo, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.data.checkout_url) {
                window.open(response.data.checkout_url, '_blank'); // Opens the payment page in a new tab
            } else {
                console.error('No checkout URL provided in response');
            }
        } catch (error) {
            console.error('Payment failed:', error);
        }
    };



    const handleEdit = (promo) => {
        setEditingPromo(promo._id);
        setEditValues({ ...promo });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        setEditValues((prev) => ({ ...prev, image: e.target.files[0] }));
    };

    const handleUpdate = async (promotionId) => {
        try {
            let imageUrl = editValues.image; // Keep existing image URL if no new image is uploaded

            if (editValues.image instanceof File) {
                const formData = new FormData();
                formData.append('file', editValues.image);
                formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); // Replace with your Cloudinary upload preset

                const cloudinaryResponse = await axios.post(CLOUDINARY_URL, formData);
                imageUrl = cloudinaryResponse.data.secure_url;
            }

            const updatedPromo = {
                title: editValues.title,
                description: editValues.description,
                tier: editValues.tier,
                date: editValues.date,
                image: imageUrl,
            };

            console.log(updatedPromo)

            const response = await axios.put(`http://localhost:4000/promotion/${promotionId}`, updatedPromo, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            if (response.data.promotion) {
                setPromotions((prevPromotions) =>
                    prevPromotions.map((promo) =>
                        promo._id === promotionId ? { ...promo, ...updatedPromo } : promo
                    )
                );
            }

            alert('Promotion updated successfully!');
            setEditingPromo(null);
        } catch (error) {
            console.error('Update failed:', error);
        }
    };


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Promotions</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-2">Title</th>
                                <th className="border p-2">Description</th>
                                <th className="border p-2">Date</th>
                                <th className="border p-2">Tier</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promotions.map((promo) => (
                                <tr key={promo._id} className="border" onDoubleClick={() => handleEdit(promo)}>
                                    <td className="border p-2 w-1/7">
                                        {editingPromo === promo._id ? (
                                            <input type="text" name="title" value={editValues.title} onChange={handleInputChange} className="border p-1" />
                                        ) : (
                                            <h1 className='text-sm'>{promo.title}</h1>
                                        )}
                                    </td>
                                    <td className="border p-2 w-1/3">
                                        {editingPromo === promo._id ? (
                                            <textarea name="description" value={editValues.description} onChange={handleInputChange} className="border p-1 w-full" />
                                        ) : (
                                            <h1 className='text-xs'>{promo.description}</h1>
                                        )}
                                    </td>
                                    <td className="border p-2 text-center">
                                        {editingPromo === promo._id ? (
                                            <input type="date" name="date" value={editValues.date.split('T')[0]} onChange={handleInputChange} className="border p-1" />
                                        ) : (
                                            new Date(promo.date).toLocaleDateString()
                                        )}
                                    </td>
                                    <td className="border p-2 text-center">
                                        {editingPromo === promo._id ? (
                                            <select name="tier" value={editValues.tier} onChange={handleInputChange} className="border p-1">
                                                <option value="Platinum">Platinum</option>
                                                <option value="Gold">Gold</option>
                                                <option value="Silver">Silver</option>
                                                <option value="Bronze">Bronze</option>
                                                <option value="Basic">Basic</option>
                                            </select>
                                        ) : (
                                            promo.tier
                                        )}
                                    </td>
                                    <td className="border p-2 text-center flex flex-row justify-center items-center gap-2">
                                        {editingPromo === promo._id ? (
                                            <>
                                                <input type="file" name="image" onChange={handleFileChange} className="border p-1" />
                                                <button className="bg-yellow-500 text-white px-3 py-1 rounded ml-2" onClick={() => handleUpdate(promo._id)}>Save</button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    disabled={promo.status === 'active' ? true : false}
                                                    className={`${promo.status === 'active' ? "bg-gray-300" : 'bg-blue-500 hover:bg-blue-700'} text-white px-3 py-1 rounded mr-2`}
                                                    onClick={() => handlePay(promo._id, promo.tier)}>
                                                    {promo.status === 'active' ? "Paid" : "Pay"}
                                                </button>

                                                <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(promo)}>Edit</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default UnderApplication;
