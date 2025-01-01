import { useState, useCallback } from 'react';
import axios from 'axios';

function usePost() {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const post = useCallback(async (url, payload) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axios.post(url, payload, {
                                                              headers: {
                                                              'Content-Type': 'application/json',
                                                                       },
                                                               withCredentials: true,
                                                            });
            setData(response.data);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }, []);

    return { data, error, isLoading, post };
}

export default usePost;
