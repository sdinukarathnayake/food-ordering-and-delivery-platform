import React, { useState } from 'react';
import axios from 'axios';
import './ResturantRegister.css';
import { useNavigate } from 'react-router-dom';

function ResturantRegistration() {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [resturantPhoto, setResturantPhoto] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState(false);
    const [adminPassword, setAdminPassword] = useState('');
    const [email, setEmail] = useState('');
    const [adminName, setAdminName] = useState('');
    const [role, setRole] = useState("ResturantAdmin");
    const [adminPhoto, setAdminPhoto] = useState(null);

    const navigate = useNavigate();

    const getCoordinates = async (address) => {
        const apiKey = 'pk.2ab1bb342bf1f30767386814587a09fc';
        try {
            const response = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${apiKey}&q=${address}&format=json`);
            const data = response.data[0];
            if (data) {
                return { lat: data.lat, lng: data.lon };
            } else {
                throw new Error("Location not found");
            }
        } catch (err) {
            console.error("Error fetching coordinates:", err);
            throw err;
        }
    };

    const registerResturant = async (e) => {
        e.preventDefault();

        try {
            if (!location) {
                alert('Enter a valid location.');
                return;
            }

            const coordinates = await getCoordinates(location);
            const { lat, lng } = coordinates;

            const formData = new FormData();
            formData.append('name', name);
            formData.append('location', location);
            formData.append('paymentStatus', paymentStatus.toString());
            formData.append('lat', lat);
            formData.append('lng', lng);

            if (resturantPhoto) {
                formData.append('resturantPhoto', resturantPhoto);
            }

            formData.append("adminName", adminName);
            formData.append("adminEmail", email);
            formData.append("adminPassword", adminPassword);
            formData.append("role", role);

            if (adminPhoto) {
                formData.append("adminPhoto", adminPhoto);
            }

            console.log('formData', formData);

            const response = await axios.post('http://localhost:7001/api/resturants/registerResturant', formData, {
                withCredentials: true,
            });

            console.log(response.data.registeredResturant);

            if (response.status === 200) {
                navigate('/login');
            } else if (response.status === 404) {
                alert(response.data.message || 'Registration failed');
            }
        } catch (err) {
            console.error(err);
            if (err.message === "Location not found") {
                alert('Location not found. Please enter a valid address.');
            } else {
                alert('Something went wrong with the registration.');
            }
        }
    };

    return (
        <div className='resturantRegister-container'>
            <form onSubmit={registerResturant}>
                <h1>Register the Restaurant</h1>
                <label>Restaurant Name</label>
                <input type='text' name='name' value={name} onChange={(e) => setName(e.target.value)} />

                <label>Restaurant Photo</label>
                <input type='file' accept='image/*' onChange={(e) => setResturantPhoto(e.target.files[0])} /> <br /> <br />

                <label>Location</label>
                <input
                    type='text'
                    name='location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder='Enter the address or location'
                />

                <label>Payment</label> <br />

                <h1>Register the Restaurant Admin</h1>

                <label>Admin Name</label>
                <input type='text' name='adminName' value={adminName} onChange={(e) => setAdminName(e.target.value)} />

                <label>Admin Password</label>
                <input type='password' name='password' value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />

                <label>Admin Email</label>
                <input type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} />

                <label>Admin Photo</label>
                <input type='file' accept='image/*' onChange={(e) => setAdminPhoto(e.target.files[0])} /> <br /><br />

                <button type='submit'>Register Restaurant</button>
            </form>
        </div>
    );
}

export default ResturantRegistration;