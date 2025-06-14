import React, { useEffect, useState, createContext, useContext } from 'react';
import io from 'socket.io-client';
import { useAuthUserContext } from './AuthUserContext';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const {authUser}=useAuthUserContext()

    useEffect(() => {

        if(!authUser) return // if not authuser is initialized do nothing

        const newSocket = io('http://localhost:4000',{ query: {role:'restaurant_admin',userId:authUser?._id},withCredentials:true});
        setSocket(newSocket);


        // Handle connection and disconnection events
        newSocket.on('connect', () => {
            console.log('Connected to socket.io server');
        });

        newSocket.on('disconnect', () => {
            console.log('Disconnected from socket.io server');
        });

        return () => {
            newSocket.close();
        };
    }, [authUser]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
