import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthUserContext } from '../../../contexts/AuthUserContext';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dpavrc7wd/image/upload';
const CLOUDINARY_UPLOAD_PRESET = 'ml_default';


const CreateNew = () => {
    const [formData, setFormData] = useState({
        restaurantId: '',
        tier: 'Basic',
        date: '',
        image: '',
        title: '',
        description: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthUserContext()
    const [price,setPrice]=useState({})

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const uploadImageToCloudinary = async () => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET); // Replace with your Cloudinary upload preset

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            return response.data.secure_url;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Upload image first
        const uploadedImageUrl = await uploadImageToCloudinary();
        if (!uploadedImageUrl) {
            setLoading(false);
            alert('Failed to upload image.');
            return;
        }

        const promotionData = { ...formData, image: uploadedImageUrl,restaurantId:authUser._id };

        try {
            const response = await axios.post('http://localhost:4000/promotion/add', promotionData, {
                headers: { 'Content-Type': 'application/json' },withCredentials:true
            });
            console.log(response)

            if (response.status === 201) {
                alert('Promotion added successfully!');
                setFormData({ restaurantId: '', tier: '', date: '', image: '', title: '', description: '' });
                setImageFile(null);
            }
        } catch (error) {
            console.error('Error adding promotion:', error);
            alert('Failed to add promotion.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" bg-white px-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2 text-center">Add New Promotion</h2>
            <form onSubmit={handleSubmit}>
               

                <div className="mb-4">
                    <label className="block font-medium">Promotion Tier</label>
                    <select name="tier" value={formData.tier} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required>
                        <option value="Platinum" className='text-violet-600 font-semibold'>Platinum (Highest Priority) ( {price.Platinum} ETB )</option>
                        <option value="Gold" className='text-orange-600 font-semibold'>Gold ( {price.Gold} ETB  ) </option>
                        <option value="Silver" className='text-gray-500 font-semibold'>Silver ( {price.Silver} ETB  )</option>
                        <option value="Bronze" className='text-red-600 font-semibold'>Bronze ( {price.Bronze} ETB  )</option>
                        <option value="Basic" className='text-gray-800 font-semibold'>Basic (Lowest Priority) ( {price.Basic} ETB  ) </option>
                    </select>
                </div>

                <div className="flex space-x-4 mb-4">
                    <div className="">
                        <label className="block font-medium">Date (when do you want the promotion to be displayed )</label>
                        <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Promotion Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" required />
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border rounded-lg" rows="3" required></textarea>
                </div>

                <div className="mb-4">
                    <label className="block font-medium">Upload Image</label>
                    <input type="file" onChange={handleFileChange}  className="w-full px-3 py-2 border rounded-lg" required />
                </div>

                <button type="submit" className="w-full bg-gray-700 text-white py-2 px-4 rounded-lg hover:bg-gray-900 transition" disabled={loading}>
                    {loading ? 'Submitting...' : 'Add Promotion'}
                </button>
            </form>
        </div>
    );
};

export default CreateNew;
