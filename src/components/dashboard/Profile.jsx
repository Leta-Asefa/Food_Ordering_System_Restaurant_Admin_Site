import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthUserContext } from '../../contexts/AuthUserContext';
import { CiLocationOn } from 'react-icons/ci';
const Profile = () => {
    const [formData, setFormData] = useState({
        name: '',
        location: { type: 'Point', coordinates: [] },
        opened: false,
        image: '',
        cuisine: '',
        priceRange: '',
        address: '',
        contact: '',
        _id: ''
    });
    const [isUpdating, setIsUpdating] = useState(false)
    const { authUser, setAuthUser } = useAuthUserContext();
    const [bankName, setBankName] = useState('Select Bank')
    const [bankAccountName, setBankAccountName] = useState('')
    const [bankAccountNumber, setBankAccountNumber] = useState('')
    const [pictures, setPictures] = useState(() => (authUser.pictures && authUser.pictures.length > 0 ? [...authUser.pictures] : []));
    const [isUpdatingPictures, setIsUpdatingPictures] = useState(false)

    const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dpavrc7wd/image/upload';
    const CLOUDINARY_UPLOAD_PRESET = 'ml_default';

    useEffect(() => {
        async function getProfile() {

            const response = await axios.get(`http://localhost:4000/restaurant/${authUser.contact}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true,
            });

            // Assuming the API response returns data in the correct format
            const { _id, name, location, opened, image, cuisine, priceRange, address, contact, bankAccountName, bankAccountNumber, bankName } = response.data;
            // Set the formData state with the fetched data
            setFormData({
                name: name || '',
                location: location || { type: 'Point', coordinates: [] },
                opened: opened || false,
                image: image || '',  // keep the image if provided by the response
                cuisine: cuisine || '',
                priceRange: priceRange || '',
                address: address || '',
                contact: contact || '',
                _id
            });

            setBankAccountName(bankAccountName)
            setBankName(bankName)
            setBankAccountNumber(bankAccountNumber)
        }


        getProfile()

    }, [])

    useEffect(() => {
        // If authUser.pictures changes (e.g., after login), update pictures state
        if (authUser.pictures && authUser.pictures.length > 0) {
            setPictures([...authUser.pictures]);
        }
    }, [authUser.pictures]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setFormData({
            ...formData,
            [name]: checked,
        });
    };

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

        try {
            const response = await axios.post(CLOUDINARY_URL, formData);
            const image = response.data.secure_url;
            setFormData((prevFormData) => ({
                ...prevFormData,
                image,
            }));

        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                // Structure location as { type: 'Point', coordinates: [latitude, longitude] }
                const location = {
                    type: 'Point',
                    coordinates: [position.coords.longitude, position.coords.latitude],
                };
                setFormData({
                    ...formData,
                    location, // Update the location property
                });
            });
        } else {
            alert('Geolocation is not supported by this browser.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate contact number before submitting
        const contact = formData.contact;
        if (!/^0[79]\d{8}$/.test(contact)) {
            alert('Contact number must start with 09 or 07 and be exactly 10 digits.');
            return;
        }
        setIsUpdating(true);
        try {
            const response = await axios.put(
                `http://localhost:4000/restaurant/update/${authUser.contact}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                }
            );
            console.log("response", response.data)

            if (response.data.message) {
                setAuthUser(prev => ({ ...prev, ...formData }))
                setFormData(prev => ({ ...prev, ...formData }));
            }

            if (response.data.error)
                alert(response.data.error)


        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdating(false);
        }
    };

    const updateBankInformation = async () => {
        // Validation: ensure all fields are filled
        if (!bankName || !bankAccountName || !bankAccountNumber) {
            alert('Please fill in all bank information fields.');
            return;
        }
        setIsUpdating(true)
        // Debug: log the payload to ensure correct values are sent
        console.log('Updating bank info with:', { bankName, bankAccountName, bankAccountNumber });
        try {

            const response = await axios.put(`http://localhost:4000/restaurant/update/bankinfo/${authUser.contact}`,
                { bankName, bankAccountName, bankAccountNumber }
                , {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    withCredentials: true,
                });

            if (response.data.error) {
                setBankName(authUser.bankName)
                setBankAccountName(authUser.bankAccountName)
                setBankAccountNumber(authUser.bankAccountNumber)
                alert(response.data.error)
            }

        } catch (error) {
            console.log(error)
        }
        finally {
            setIsUpdating(false)
        }

    }

    const handleImageChange = async (index) => {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.onchange = async (event) => {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

                try {
                    const response = await fetch(CLOUDINARY_URL, {
                        method: "POST",
                        body: formData,
                    });
                    const data = await response.json();
                    if (data.secure_url) {
                        setPictures((prevImages) => {
                            const updatedImages = [...(prevImages || Array(6).fill(undefined))];
                            updatedImages[index] = data.secure_url;
                            return updatedImages;
                        });
                    }
                } catch (error) {
                    console.error("Error uploading image:", error);
                }
            }
        };
        fileInput.click();
    };

    const handleUpdatePictures = async () => {
        setIsUpdatingPictures(true);
        console.log("before updating pictures", pictures)
        try {
            const response = await fetch(`http://localhost:4000/restaurant/update/${authUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ pictures, _id: authUser._id }),
            });
            // Update authUser context with new pictures if backend update is successful
            if (response.ok) {
                setAuthUser({ ...authUser, pictures });
            }
        } catch (error) {
            console.error("Error sending images to backend:", error);
        } finally {
            setIsUpdatingPictures(false);
        }
    };

    return (
        <div className="w-full mx-auto  py-0 px-6  rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold w-96 mx-auto text-center">Restaurant's Profile</h2>
            <h2 className="text-sm w-96 mx-auto text-center">Restaurant Id : {formData._id}</h2>
            <form onSubmit={handleSubmit}>

                <div className=" w-24 mx-auto ">

                    <img src={formData.image ? formData.image : 'logoplaceholder.svg'} alt="Restaurant" className="mt-2 w-20 mx-auto h-auto hover:opacity-50 rounded-lg" onClick={() => document.getElementById('image').click()} />

                    <label className=" text-gray-700 text-xs mb-2" htmlFor="image">
                        upload profile pic
                    </label>
                    <input
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="invisible"
                    />
                </div>

                <div className='h-0.5 w-full bg-gray-300 mb-4'></div>




                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Restaurant Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
                        Location
                    </label>
                    <input
                        type="text"
                        name="location"
                        id="locatoin"
                        disabled
                        value={formData.location.coordinates.length > 0 ? formData.location.coordinates.join(', ') : ''}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                    <button
                        type="button"
                        onClick={handleLocationClick}
                        className="mt-2 bg-gray-700 hover:bg-gray-900 text-white text-xs py-1 px-4 rounded focus:outline-none focus:shadow-outline flex justify-between items-center gap-2"
                    >
                        <CiLocationOn className='text-white w5 h-5' />
                        Use Current Location
                    </button>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Opened
                    </label>
                    <input
                        type="checkbox"
                        name="opened"
                        id="opened"
                        checked={formData.opened}
                        onChange={handleCheckboxChange}
                        className="mr-2 leading-tight"
                    />
                    <span className="text-sm">Is the restaurant open?</span>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuisine">
                        Cuisine
                    </label>

                    <select
                        id="cuisine"
                        name="cuisine"
                        value={formData.cuisine}
                        className="p-1.5"
                        onChange={handleChange}
                    >
                        <option value="🇦🇫 Afghan">🇦🇫 Afghan</option>
                        <option value="🇦🇱 Albanian">🇦🇱 Albanian</option>
                        <option value="🇩🇿 Algerian">🇩🇿 Algerian</option>
                        <option value="🇺🇸 American">🇺🇸 American</option>
                        <option value="🇦🇩 Andorran">🇦🇩 Andorran</option>
                        <option value="🇦🇴 Angolan">🇦🇴 Angolan</option>
                        <option value="🇦🇷 Argentinian">🇦🇷 Argentinian</option>
                        <option value="🇦🇲 Armenian">🇦🇲 Armenian</option>
                        <option value="🇦🇺 Australian">🇦🇺 Australian</option>
                        <option value="🇦🇹 Austrian">🇦🇹 Austrian</option>
                        <option value="🇦🇿 Azerbaijani">🇦🇿 Azerbaijani</option>
                        <option value="🇧🇩 Bangladeshi">🇧🇩 Bangladeshi</option>
                        <option value="🇧🇾 Belarusian">🇧🇾 Belarusian</option>
                        <option value="🇧🇪 Belgian">🇧🇪 Belgian</option>
                        <option value="🇧🇿 Belizean">🇧🇿 Belizean</option>
                        <option value="🇧🇴 Bolivian">🇧🇴 Bolivian</option>
                        <option value="🇧🇦 Bosnian">🇧🇦 Bosnian</option>
                        <option value="🇧🇷 Brazilian">🇧🇷 Brazilian</option>
                        <option value="🇬🇧 British">🇬🇧 British</option>
                        <option value="🇧🇬 Bulgarian">🇧🇬 Bulgarian</option>
                        <option value="🇧🇫 Burkinabe">🇧🇫 Burkinabe</option>
                        <option value="🇰🇭 Cambodian">🇰🇭 Cambodian</option>
                        <option value="🇨🇲 Cameroonian">🇨🇲 Cameroonian</option>
                        <option value="🇨🇦 Canadian">🇨🇦 Canadian</option>
                        <option value="🏝️ Caribbean">🏝️ Caribbean</option>
                        <option value="🇨🇱 Chilean">🇨🇱 Chilean</option>
                        <option value="🇨🇳 Chinese">🇨🇳 Chinese</option>
                        <option value="🇨🇴 Colombian">🇨🇴 Colombian</option>
                        <option value="🇨🇷 Costa Rican">🇨🇷 Costa Rican</option>
                        <option value="🇭🇷 Croatian">🇭🇷 Croatian</option>
                        <option value="🇨🇺 Cuban">🇨🇺 Cuban</option>
                        <option value="🇨🇾 Cypriot">🇨🇾 Cypriot</option>
                        <option value="🇨🇿 Czech">🇨🇿 Czech</option>
                        <option value="🇩🇰 Danish">🇩🇰 Danish</option>
                        <option value="🇩🇯 Djiboutian">🇩🇯 Djiboutian</option>
                        <option value="🇩🇴 Dominican">🇩🇴 Dominican</option>
                        <option value="🇳🇱 Dutch">🇳🇱 Dutch</option>
                        <option value="🇪🇨 Ecuadorian">🇪🇨 Ecuadorian</option>
                        <option value="🇪🇬 Egyptian">🇪🇬 Egyptian</option>
                        <option value="🇪🇹 Ethiopian">🇪🇹 Ethiopian</option>
                        <option value="🇫🇮 Finnish">🇫🇮 Finnish</option>
                        <option value="🇫🇷 French">🇫🇷 French</option>
                        <option value="🇬🇦 Gabonese">🇬🇦 Gabonese</option>
                        <option value="🇬🇪 Georgian">🇬🇪 Georgian</option>
                        <option value="🇩🇪 German">🇩🇪 German</option>
                        <option value="🇬🇭 Ghanaian">🇬🇭 Ghanaian</option>
                        <option value="🇬🇷 Greek">🇬🇷 Greek</option>
                        <option value="🇬🇹 Guatemalan">🇬🇹 Guatemalan</option>
                        <option value="🇭🇹 Haitian">🇭🇹 Haitian</option>
                        <option value="🇭🇳 Honduran">🇭🇳 Honduran</option>
                        <option value="🇭🇺 Hungarian">🇭🇺 Hungarian</option>
                        <option value="🇮🇸 Icelandic">🇮🇸 Icelandic</option>
                        <option value="🇮🇳 Indian">🇮🇳 Indian</option>
                        <option value="🇮🇩 Indonesian">🇮🇩 Indonesian</option>
                        <option value="🇮🇷 Iranian">🇮🇷 Iranian</option>
                        <option value="🇮🇶 Iraqi">🇮🇶 Iraqi</option>
                        <option value="🇮🇪 Irish">🇮🇪 Irish</option>
                        <option value="🇮🇱 Israeli">🇮🇱 Israeli</option>
                        <option value="🇮🇹 Italian">🇮🇹 Italian</option>
                        <option value="🇯🇲 Jamaican">🇯🇲 Jamaican</option>
                        <option value="🇯🇵 Japanese">🇯🇵 Japanese</option>
                        <option value="🇯🇴 Jordanian">🇯🇴 Jordanian</option>
                        <option value="🇰🇿 Kazakh">🇰🇿 Kazakh</option>
                        <option value="🇰🇪 Kenyan">🇰🇪 Kenyan</option>
                        <option value="🇰🇷 Korean">🇰🇷 Korean</option>
                        <option value="🇱🇧 Lebanese">🇱🇧 Lebanese</option>
                        <option value="🇱🇷 Liberian">🇱🇷 Liberian</option>
                        <option value="🇱🇹 Lithuanian">🇱🇹 Lithuanian</option>
                        <option value="🇱🇺 Luxembourgish">🇱🇺 Luxembourgish</option>
                        <option value="🇲🇾 Malaysian">🇲🇾 Malaysian</option>
                        <option value="🇲🇱 Malian">🇲🇱 Malian</option>
                        <option value="🇲🇽 Mexican">🇲🇽 Mexican</option>
                        <option value="🇲🇳 Mongolian">🇲🇳 Mongolian</option>
                        <option value="🇲🇦 Moroccan">🇲🇦 Moroccan</option>
                        <option value="🇲🇿 Mozambican">🇲🇿 Mozambican</option>
                        <option value="🇳🇵 Nepali">🇳🇵 Nepali</option>
                        <option value="🇳🇿 New Zealander">🇳🇿 New Zealander</option>
                        <option value="🇳🇮 Nicaraguan">🇳🇮 Nicaraguan</option>
                        <option value="🇳🇬 Nigerian">🇳🇬 Nigerian</option>
                        <option value="🇳🇴 Norwegian">🇳🇴 Norwegian</option>
                        <option value="🇵🇰 Pakistani">🇵🇰 Pakistani</option>
                        <option value="🇵🇦 Panamanian">🇵🇦 Panamanian</option>
                        <option value="🇵🇾 Paraguayan">🇵🇾 Paraguayan</option>
                        <option value="🇵🇪 Peruvian">🇵🇪 Peruvian</option>
                        <option value="🇵🇭 Filipino">🇵🇭 Filipino</option>
                        <option value="🇵🇱 Polish">🇵🇱 Polish</option>
                        <option value="🇵🇹 Portuguese">🇵🇹 Portuguese</option>
                        <option value="🇶🇦 Qatari">🇶🇦 Qatari</option>
                        <option value="🇷🇴 Romanian">🇷🇴 Romanian</option>
                        <option value="🇷🇺 Russian">🇷🇺 Russian</option>
                        <option value="🇸🇦 Saudi">🇸🇦 Saudi</option>
                        <option value="🇸🇳 Senegalese">🇸🇳 Senegalese</option>
                        <option value="🇷🇸 Serbian">🇷🇸 Serbian</option>
                        <option value="🇸🇬 Singaporean">🇸🇬 Singaporean</option>
                        <option value="🇸🇰 Slovak">🇸🇰 Slovak</option>
                        <option value="🇸🇮 Slovenian">🇸🇮 Slovenian</option>
                        <option value="🇿🇦 South African">🇿🇦 South African</option>
                        <option value="🇰🇷 South Korean">🇰🇷 South Korean</option>
                        <option value="🇪🇸 Spanish">🇪🇸 Spanish</option>
                        <option value="🇱🇰 Sri Lankan">🇱🇰 Sri Lankan</option>
                        <option value="🇸🇩 Sudanese">🇸🇩 Sudanese</option>
                        <option value="🇸🇪 Swedish">🇸🇪 Swedish</option>
                        <option value="🇨🇭 Swiss">🇨🇭 Swiss</option>
                        <option value="🇸🇾 Syrian">🇸🇾 Syrian</option>
                        <option value="🇹🇼 Taiwanese">🇹🇼 Taiwanese</option>
                        <option value="🇹🇿 Tanzanian">🇹🇿 Tanzanian</option>
                        <option value="🇹🇭 Thai">🇹🇭 Thai</option>
                        <option value="🇹🇳 Tunisian">🇹🇳 Tunisian</option>
                        <option value="🇹🇷 Turkish">🇹🇷 Turkish</option>
                        <option value="🇺🇬 Ugandan">🇺🇬 Ugandan</option>
                        <option value="🇺🇦 Ukrainian">🇺🇦 Ukrainian</option>
                        <option value="🇦🇪 Emirati">🇦🇪 Emirati</option>
                        <option value="🇺🇾 Uruguayan">🇺🇾 Uruguayan</option>
                        <option value="🇺🇿 Uzbek">🇺🇿 Uzbek</option>
                        <option value="🇻🇪 Venezuelan">🇻🇪 Venezuelan</option>
                        <option value="🇻🇳 Vietnamese">🇻🇳 Vietnamese</option>
                        <option value="🇾🇪 Yemeni">🇾🇪 Yemeni</option>
                        <option value="🇿🇲 Zambian">🇿🇲 Zambian</option>
                        <option value="🇿🇼 Zimbabwean">🇿🇼 Zimbabwean</option>
                    </select>

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="priceRange">
                        Price Range
                    </label>
                    <input
                        type="text"
                        name="priceRange"
                        id="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        id="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="contact">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        name="contact"
                        id="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>



                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 mb-10 rounded focus:outline-none focus:shadow-outline w-full"
                    >
                        {isUpdating ? 'Updating ...' : 'Update'}
                    </button>
                </div>
            </form>


            {/*---------------------------------- Pictures ------------ ------------------------------------------*/}


            <div className="p-4 mb-5">
                <div className="grid grid-cols-6 gap-4 ">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer border-2 border-gray-300 rounded-lg overflow-hidden hover:opacity-75 flex items-center justify-center bg-gray-100 min-h-[80px]"
                            onClick={() => handleImageChange(index)}
                        >
                            {pictures && pictures[index] ? (
                                <img src={pictures[index]} alt={`Selected ${index + 1}`} className="w-full h-auto" />
                            ) : (
                                <img src="/logoplaceholder.svg" alt="Placeholder" className="w-12 h-12 opacity-60" />
                            )}
                        </div>
                    ))}
                </div>
                <button
                    onClick={handleUpdatePictures}
                    className="mt-4 bg-gray-700 text-white px-4 py-2 w-full rounded hover:bg-gray-900"
                    disabled={isUpdatingPictures}
                >
                    {isUpdatingPictures ? 'Updating...' : 'Update Pictures'}
                </button>
            </div>



            {/*---------------------------------- Bank Account Information ------------------------------------------*/}

            <div className='mt10'>
                <div className='text-center text-lg font-bold p-2 underline'>Bank Account Information</div>
                <div className='text-center  p-2 text-xs'>* Make sure account name and account number are valid, please cross check it before you submit !</div>


                <div className="mb-4">

                    <label for="bankName" className='text-gray-700 font-bold text-sm'>Bank Name </label>
                    <select id="bankName" name="bankName" value={bankName} className='p-1.5' onChange={(e) => {
                        console.log("bank name", e.target.value)
                        setBankName(e.target.value)
                    }}>
                        <option value="">Select Bank Name</option>
                        <option value="Commercial Bank of Ethiopia (CBE)">Commercial Bank of Ethiopia (CBE)</option>
                        <option value="Dashen">Dashen</option>
                        <option value="Bank of Abyssinia">Bank of Abyssinia</option>
                        <option value="Abay Bank">Abay Bank</option>
                        <option value="Addis International Bank">Addis International Bank</option>
                        <option value="Ahadu Bank">Ahadu Bank</option>
                        <option value="Awash Bank">Awash Bank</option>
                        <option value="Berhan Bank">Berhan Bank</option>
                        <option value="CBEBirr">CBEBirr</option>
                        <option value="Coopay-Ebirr">Coopay-Ebirr</option>
                        <option value="Dashen Bank">Dashen Bank</option>
                        <option value="Global Bank Ethiopia">Global Bank Ethiopia</option>
                        <option value="Hibret Bank">Hibret Bank</option>
                        <option value="Lion International Bank">Lion International Bank</option>
                        <option value="M-Pesa">M-Pesa</option>
                        <option value="Nib International Bank">Nib International Bank</option>
                        <option value="Oromia International Bank">Oromia International Bank</option>
                        <option value="telebirr">telebirr</option>
                        <option value="Wegagen Bank">Wegagen Bank</option>
                        <option value="Zemen Bank">Zemen Bank</option>
                    </select>

                </div>


                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankaccountname">
                        Bank Account Name
                    </label>
                    <input
                        type="text"
                        name="bankaccountname"
                        id="bankaccountname"
                        value={bankAccountName}
                        onChange={(e) => setBankAccountName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>



                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankaccountnumber">
                        Bank Account Number
                    </label>
                    <input
                        type="text"
                        name="bankaccountnumber"
                        id="bankaccountnumber"
                        value={bankAccountNumber}
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 mb-10 rounded focus:outline-none focus:shadow-outline w-full"
                    onClick={updateBankInformation}
                >
                    {isUpdating ? 'Updating ...' : 'Update Bank Information'}
                </button>
            </div>



        </div>
    );
};

export default Profile;
