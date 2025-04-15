import React from 'react'
import './Customer.css'
import { AuthContext } from '../../Context/AuthContext'
import { useContext } from 'react'

function Customer() {

    const { user } = useContext(AuthContext);

    return (
        <div className='customer-container'>
            <h1>Customer dashboard</h1>
            <p>role = {user.role}</p>
            <p>name = {user.name}</p>
            <p>email = {user.email}</p>
        </div>
    )
}

export default Customer
