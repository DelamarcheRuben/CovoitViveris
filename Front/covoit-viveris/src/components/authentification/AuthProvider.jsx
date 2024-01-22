import React, { createContext, useContext, useEffect, useState } from 'react';
import { loginUser, logoutUser } from './AuthenticationService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        const success = await loginUser(username, password);
        if (success) {
            setUser({ username }); 
        }
        return success;
    };

    const logout = () => {
        logoutUser();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
