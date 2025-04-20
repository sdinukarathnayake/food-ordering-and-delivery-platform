import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link> |{" "}
    <Link to="/cart">Cart</Link> |{" "}
    <Link to="/order-status">Order Status</Link> |{" "}
    <Link to="/login">Login</Link> |{" "}
    <Link to="/register">Register</Link>
  </nav>
);

export default Navbar;
