import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CustomerRegister.css';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import markerIconPng from "leaflet/dist/images/marker-icon.png";

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

function LocationSelector({ setLat, setLng }) {
  useMapEvents({
    click(e) {
      setLat(e.latlng.lat);
      setLng(e.latlng.lng);
    }
  });
  return null;
}

function CustomerRegister() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [photo, setPhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [currentLocationLatitude, setLat] = useState(6.9271);
  const [currentLocationLongitude, setLng] = useState(79.8612);

  const navigate = useNavigate();

  const registerForm = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('customerName', customerName);
      formData.append('phone', phone);
      formData.append('currentLocationLatitude', currentLocationLatitude);
      formData.append('currentLocationLongitude', currentLocationLongitude);

      if (photo) {
        formData.append('customerPhoto', photo);
      }

      await axios.post('http://localhost:7001/api/users/register', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const customerResponse = await axios.post('http://localhost:5002/customer/register', {
        customerName,
        email,
        phone,
        name,
        password,
        currentLocationLatitude,
        currentLocationLongitude
      });

      setSuccess(customerResponse.data.message);
      setTimeout(() => navigate('/login'), 2000);

    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed!');
    }
  };


    return (
        <div className='form-container'>
            <div className='form-card'>
                <h1 className=''>Welcome to Big Byte..</h1>

                <h3 className=''>New customers can register from here</h3>

                {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}

                <form onSubmit={registerForm}>

                    <label>Name</label>
                    <input type='text' value={customerName} onChange={(e) => setCustomerName(e.target.value)} required /> <br />

                    <label>Email</label>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required /> <br />

                    <label>Phone</label>
                    <input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} required /> <br />

                    {previewImage && (
                    <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                        <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                            maxWidth: '150px',
                            height: 'auto',
                            borderRadius: '10px',
                            boxShadow: '0 0 8px rgba(0,0,0,0.1)'
                        }}
                        />
                    </div>
                    )}

                    <label>Photo</label>
                    <input
                        type='file'
                        accept='image/*'
                        onChange={(e) => {
                            const file = e.target.files[0];
                            setPhoto(file);
                            if (file) {
                            const imageURL = URL.createObjectURL(file);
                            setPreviewImage(imageURL);
                            }
                        }}
                    />

                    <label>Username</label>
                    <input type='text' value={name} onChange={(e) => setName(e.target.value)} required /> <br />

                    <label>Password</label>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required /> <br />

                    <label>Select Your Location</label>

                    <button
                        type='button'
                        className='location-btn'
                        onClick={() => {
                            if (navigator.geolocation) {

                                navigator.geolocation.getCurrentPosition(
                                (position) => {
                                    const { latitude, longitude } = position.coords;
                                    setLat(latitude);
                                    setLng(longitude);
                                },
                                (error) => {
                                    setError("Unable to retrieve your location.");
                                    console.error(error);
                                },
                                {
                                    enableHighAccuracy: true,
                                    timeout: 10000,
                                    maximumAge: 0
                                }
                                );
                            
                              } else {
                                setError("Geolocation is not supported by your browser.");
                              }   
                        }}
                        >
                        Use My Location
                        </button>


                    <MapContainer
                    center={[currentLocationLatitude, currentLocationLongitude]}
                    zoom={13}
                    style={{ height: '300px', marginBottom: '1rem' }}
                    >

                        <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        />
                        <LocationSelector setLat={setLat} setLng={setLng} />
                        <Marker position={[currentLocationLatitude, currentLocationLongitude]} icon={markerIcon} />
                    </MapContainer>

                    <div className="hidden-coordinates">
                        <label>Latitude</label>
                        <input type='text' value={currentLocationLatitude} readOnly />

                        <label>Longitude</label>
                        <input type='text' value={currentLocationLongitude} readOnly />
                    </div>

                    <button type='submit'>Register</button>
        </form>
      </div>
    </div>
  );
}

export default CustomerRegister;
