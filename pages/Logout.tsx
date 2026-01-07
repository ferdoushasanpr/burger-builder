
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { logout } from '../redux/authCreator';

const Logout: React.FC = () => {
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(logout());
    }, [dispatch]);

    return <Navigate to="/login" replace />;
};

export default Logout;
