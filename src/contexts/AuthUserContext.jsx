import { createContext, useContext, useEffect, useState } from 'react';

// Create context
const AuthUserContext = createContext();

// Provider component
export const AuthUserContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => {
        // Get user from localStorage on first load
        const savedUser = localStorage.getItem('authUser');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Save authUser to localStorage whenever it changes
    useEffect(() => {
        if (authUser) {
            localStorage.setItem('authUser', JSON.stringify(authUser));
        } else {
            localStorage.removeItem('authUser'); // Remove on logout
        }
    }, [authUser]);

    return (
        <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthUserContext.Provider>
    );
};

// Custom hook
export const useAuthUserContext = () => useContext(AuthUserContext);
