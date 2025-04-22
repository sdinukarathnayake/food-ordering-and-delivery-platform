import React, { useContext, useState } from 'react';
import './Header.css';
import BigBiteLogo from './BigBite.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

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

    return (
        <header className="header">
            <Link to="/" className="logo">
                <img src={BigBiteLogo} className='header-image' />
            </Link>

            <div className="menu-wrapper">
                <ul className="menu-items">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/menu">Menu</Link></li>
                    <li><Link to="/contact">Contact Us</Link></li>
                    <li><Link to="/register">Become a partner</Link></li>
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