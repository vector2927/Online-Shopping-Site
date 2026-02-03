import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (role = 'user') => {
        // Simulate login
        setUser({
            name: role === 'admin' ? 'Admin User' : 'Standard User',
            email: role === 'admin' ? 'admin@gloria.com' : 'user@gloria.com',
            role: role
        });
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
