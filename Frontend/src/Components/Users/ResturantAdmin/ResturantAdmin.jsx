import React from 'react'
import './ResturantAdmin.css'

import { useContext } from 'react'
import { AuthContext } from '../../Context/AuthContext'


function ResturantAdmin() {

    const { user } = useContext(AuthContext);

    return (
        <div className='resturantAdmin-container'>
            <h1 >Resturant admin dashbaord</h1>

            <p>Name = {user.name}</p>
            <p>Email = {user.email}</p>
        </div>
    )
}

export default ResturantAdmin
