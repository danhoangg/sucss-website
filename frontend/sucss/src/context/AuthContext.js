import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        token: null,
    });
    const [loading, setLoading] = useState(true);

    const login = async (username, password, callback) => {
        try {
            const response = await axios.post('/login', { username, password });
            const token = response.data.access_token;
            setAuth({
                isAuthenticated: true,
                token,
            });
            localStorage.setItem('token', token);
            if (callback) callback();
            return Promise.resolve();
        } catch (error) {
            console.error('Login failed', error);
            return Promise.reject(error);
        }
    };

    const logout = () => {
        setAuth({
            isAuthenticated: false,
            token: null,
        });
        localStorage.removeItem('token');
    };

    const validateToken = async (token) => {
        try {
            await axios.get('/api/protected', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setAuth({
                isAuthenticated: true,
                token,
            });
        } catch (error) {
            console.error('Token validation failed', error);
            setAuth({
                isAuthenticated: false,
                token: null,
            });
            localStorage.removeItem('token');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            validateToken(token);
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ auth, loading, login, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export { AuthProvider, AuthContext };
