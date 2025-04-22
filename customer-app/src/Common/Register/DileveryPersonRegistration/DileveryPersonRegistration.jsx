import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function DileveryPersonRegistration() {
    const [name, setName] = useState('');
       const [password, setPassword] = useState('');
       const [email, setEmail] = useState('');
       const [phone, setPhone] = useState('');
       const [photo, setPhoto] = useState(null);
       const[role,setRole]=useState("DeliveryPerson")
       const [error, setError] = useState(null);
       const [success, setSuccess] = useState(null);
   
       const navigate = useNavigate();
   
       const registerForm = async (e) => {
           e.preventDefault();
           setError(null);
           setSuccess(null);
   
           try {
               const formData = new FormData();
               formData.append('name', name);
               formData.append('email', email);
               formData.append('phone', phone);
               formData.append('password', password);
               formData.append("role",role);
               if (photo) {
                   formData.append('diliveryPhoto', photo);
               }
   
               const response = await axios.post('http://localhost:7001/api/deliveryPerson/registerDelivery', formData, {
                withCredentials: true,
               });
   
               setSuccess(response.data.message);
               setTimeout(() => navigate('/login'), 2000);
           } catch (err) {
               console.error('Registration error:', err);
               setError(err.response?.data?.message || 'Registration failed!');
           }
       };
   
       return (
           <div className='form-container'>
               <div className='form-card'>
                   <h1 className=''>Delivery person Register</h1>
   
                   {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
                   {success && <p style={{ color: 'green', textAlign: 'center' }}>{success}</p>}
   
                   <form onSubmit={registerForm}>
                       <label>Photo</label>
                       <input type='file' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} /> <br /><br />
   
                       <label>Name</label>
                       <input type='text' value={name} onChange={(e) => setName(e.target.value)} required /> <br /><br />
   
                       <label>Email</label>
                       <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required /> <br /><br />

                       <label>Phone</label>
                       <input type='text' value={phone} onChange={(e)=>setPhone(e.target.value)} required/> <br/><br/>
   
                       <label>Password</label>
                       <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required /> <br /><br />
   
                       <button type='submit'>Register</button>
                   </form>
               </div>
           </div>
       );
}

export default DileveryPersonRegistration
