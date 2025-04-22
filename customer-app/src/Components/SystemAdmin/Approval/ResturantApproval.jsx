import React, { useEffect, useState } from 'react';
import axios from 'axios';

import './ResturantApproval.css'

function ResturantApproval() {
    const [pendingRestaurants, setPendingRestaurants] = useState([]);

    useEffect(() => {
        const fetchPendingRestaurants = async () => {
            try {
                const response = await axios.get('http://localhost:7001/api/resturants/getPendingRestaurants', { withCredentials: true });
                setPendingRestaurants(response.data.pendingRestaurants);
                console.log(response.data.pendingRestaurants);
            } catch (err) {
                console.error("Error fetching pending restaurants:", err);
            }
        };

        fetchPendingRestaurants();
    }, []);

    const handleApprove = async (resturantId) => {
        try {
            await axios.put('http://localhost:7001/api/resturants/approveRestaurant',
                {
                resturantId,
                status: "approved"},{ withCredentials: true },);

            setPendingRestaurants(prevState => prevState.filter(restaurant => restaurant._id !== resturantId));
            alert("Restaurant approved!");
        } catch (err) {
            console.error("Error approving restaurant:", err);
            alert("Failed to approve restaurant.");
        }
    };

    const handleReject = async (resturantId) => {
        try {
            await axios.put('http://localhost:7001/api/resturants/approveRestaurant', {
                resturantId,
                status: "rejected"
            },{ withCredentials: true });
           
            setPendingRestaurants(prevState => prevState.filter(restaurant => restaurant._id !== resturantId));
            alert("Restaurant rejected!");
        } catch (err) {
            console.error("Error rejecting restaurant:", err);
            alert("Failed to reject restaurant.");
        }
    };

    return (
        <div className="pending-resturant-registrations-container">
            <h1>Pending Restaurant Registrations</h1>
            <div>
                {pendingRestaurants.length === 0 ? (
                    <h3>No pending restaurants for approval.</h3>
                ) : (
                    <table className='pending-resturant-registrations-table'>
                        <thead>
                            <tr>
                                <th>Resturant name</th>
                                <th>Resturant photo</th>
                                <th>Resturant admin name</th>
                                <th>Resturant location</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pendingRestaurants.map((restaurant) => (
                                <tr key={restaurant._id}>
                                   
                                        <td>{restaurant.resturantName}</td>
                                        <td>
                                            <img src={`http://localhost:7001/api/uploads/${restaurant.resturantPhoto}`}
                                            className='dp-photo'/>
                                        </td>
                                        <td>{restaurant.admin.name}</td>
                                        <td>{restaurant.resturantLocation}</td>
                                        <td>
                                            <button className='approve-btn' onClick={() => handleApprove(restaurant._id)}>Approve</button>
                                            <button className='reject-btn' onClick={() => handleReject(restaurant._id)}>Reject</button>
                                        </td>  
                                    
                                </tr>
                            ))}
                        </tbody>
                       
                    </table>
                )}
            </div>
        </div>
    );
}

export default ResturantApproval;
