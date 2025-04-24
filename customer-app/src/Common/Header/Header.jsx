import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { jwtDecode } from 'jwt-decode';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

import BigBiteLogo from './BigBite.png';

import './Header.css';

function Header() {
    const { user, logout } = useContext(AuthContext);
    const [isClicked, setIsClicked] = useState(false);

    const buttonClicked = () => {
        setIsClicked((prev) => !prev);
    };

    const handleLogout = () => {
        logout();
        setIsClicked(false);
    };

    const token = localStorage.getItem('token');

    let role = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role;
        } catch (err) {
            console.error("Invalid token", err);
        }
    }

    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={BigBiteLogo} className='header-image' />
            </Link>

            <div className="menu-wrapper">
            <ul className="menu-items">
          {role === 'Customer' ? (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/orders">Order History</Link></li>
              <li><Link to="/profile">User Profile</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/register">Become a partner</Link></li>
            </>
          )}
        </ul>

                <ul className="menu-icons">
                    <FaShoppingCart size={30} color="black" />
                    <div className='search-container'>
                        <FaSearch size={30} color='black' />
                        <input type='text' className='search-bar' placeHolder='Search...' />
                    </div>

                </ul>
            </div>

            {user ? (
                <div className="menu-container">
                    <button onClick={buttonClicked} className="menu-toggle">
                        <FontAwesomeIcon icon={isClicked ? faTimes : faBars} />
                    </button>
                    {isClicked && (
                        <div className="dropdown-menu">
                            <button onClick={handleLogout} className="logout-btn">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            ) : (<div className='buttons'>
                <button className='register-btn'>
                    <Link to='/CustomerRegister'>Register</Link></button>
                <button className='login-btn'>
                    <Link to='/login'>Login</Link></button>
            </div>)}
        </header>
    );
}
    
export default Header;