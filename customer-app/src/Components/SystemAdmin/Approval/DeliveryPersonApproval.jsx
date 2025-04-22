import { useEffect, useState } from 'react';
import axios from 'axios';

import './DeliveryPersonApproval.css';

function DeliveryPersonApproval() {

    const[deliveryPerson,setDeliveryPerson]=useState([]);

    useEffect(()=>{
        const fetchPendingDeliveryPersonRequests=async()=>{
            try{

                const response = await axios.get('http://localhost:7001/api/deliveryPerson/pending',
                    {withCredentials:true});

                if(response.status === 200){
                    setDeliveryPerson(response.data.pendingDeliveryPerson);
                    console.log(response.data.pendingDeliveryPerson);
                }    
                    
            }catch(err){
                console.error("Error fetching pending delivery person requests:", err);
            }
        }

        fetchPendingDeliveryPersonRequests();
    },[]);

    const handleApprove= async(deliveryPersonId)=>{

        try{
            const response = await axios.put('http://localhost:7001/api/deliveryPerson/approve',
                {deliveryPersonId,status:"approved"},{withCredentials:true});
            
            if(response.status === 200){
                setDeliveryPerson(prevState => prevState.filter(dp => dp._id !== deliveryPersonId));
                alert("Delivery person approved!");
            }
        }catch(err){
            console.error("Error approving delivery person:", err);
            alert("Failed to approve delivery person.");
        }
    }

    const handleReject = async(deliveryPersonId)=>{
        try{
            const response = await axios.put('http://localhost:7001/api/deliveryPerson/approve',
                {deliveryPersonId,status:"rejected"},{withCredentials:true});
            
            if(response.status === 200){
                setDeliveryPerson(prevState => prevState.filter(dp => dp._id !== deliveryPersonId));
                alert("Delivery person rejected!");
            }
        }catch(err){
            console.error("Error rejecting delivery person:", err);
            alert("Failed to reject delivery person.");
        }
    }

  return (
    <div className='delivery-person-approval-container'>
      <h1>Delivery Person Approval</h1>

       {
        deliveryPerson.length === 0 ?(
            <h3>No pending delivery people</h3>
        ):(
            <>
              <table className='delivery-person-approval-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Photo</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveryPerson.map((dp)=>{
                        return(
                            <>
                        
                            
                                    <tr key={dp._id}>
                                        <td>{dp.name}</td>
                                        <td>{dp.email}</td>
                                        <td>{dp.phone}</td>
                                        <td className=''>
                                            <img src={`http://localhost:7001/api/uploads/${dp.photo}`}
                                            alt={dp.name}
                                            className='dp-photo'/>
                                        </td>
                                        <td>
                                            <button className='approve-btn' onClick={()=> handleApprove(dp._id)}>Approve</button>
                                            <button className='reject-btn' onClick={()=>handleReject(dp._id)}>Reject</button>
                                        </td>
                                    </tr>
                            
                            </>
                        )
                    })}
                </tbody>
            </table>
            </>
           
        )
       }
      
      
    </div>
  );
}   

export default DeliveryPersonApproval;