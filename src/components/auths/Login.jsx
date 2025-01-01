import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import usePost from '../../constants/usePost';
import axios from 'axios';
import { useAuthUserContext } from '../../contexts/AuthUserContext';

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const {setAuthUser}=useAuthUserContext()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await axios.post('http://localhost:4000/restaurant/login', { phoneNumber, password }, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        });


        if (response.data.error) {
            alert(response.data.error)
            return;
        }
        else {
            localStorage.setItem('authuser',JSON.stringify(response.data.restaurant))
            setAuthUser(response.data.restaurant)
            navigate('/dashboard')
        }


    };


    return (
        <div className='px-5 py-10'>
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

            <form onSubmit={handleSubmit} className='w-72 mx-auto'>
                <div className="mb-4">
                    <input
                        type="tel"
                        id="phonenumber"
                        placeholder='phone number'
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-600"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="password"
                        id="password"
                        placeholder='password'
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-yellow-600"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700 focus:outline-none focus:ring focus:ring-yellow-600"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;