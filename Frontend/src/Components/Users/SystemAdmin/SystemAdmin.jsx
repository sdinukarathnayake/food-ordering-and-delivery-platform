import React from 'react'
import './SystemAdmin.css'
import { useContext } from 'react';

import { AuthContext } from '../../Context/AuthContext'

function SystemAdmin() {

    const { user } = useContext(AuthContext)

    return (
        <div className='admin-container'>
            <h1>SystemAdmin DashBoard</h1>
            <p>Name {user.name}</p>
            <p>Email {user.email}</p>
        </div>
    )
}

export default SystemAdmin;
