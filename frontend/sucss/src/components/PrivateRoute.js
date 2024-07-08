// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { auth, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>;
    }

    return auth.isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
