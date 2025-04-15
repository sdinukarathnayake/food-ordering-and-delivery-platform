import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:7001/api/users/checkToken', {
                    withCredentials: true
                }); 

                const token = response.data.token;
                const decoded = jwtDecode(token);
                setUser(decoded); 
            } catch (error) {
                console.error('Error fetching user from cookie:', error);
            }
        };

        fetchUser();
    }, []);

    const login = (token) => {
        // Cookies.set('token', token, {
        //     expires: 7,
        //     secure: true,
        //     sameSite: 'Strict',
        // });
        const decoded = jwtDecode(token);
        setUser(decoded);
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:7001/api/users/logout', {}, { withCredentials: true })
            setUser(null);
            navigate('/');
        } catch (err) {
            console.log(err);
        }

    };

    const isAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
