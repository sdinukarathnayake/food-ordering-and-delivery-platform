import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FundTransfer.css';

//https://connect.stripe.com/d/setup/e/_S7mmnIkGRgUhpUL4o36F0lublQ/YWNjdF8xUkRYQ1hGdHMwTDYyOVl2/bbfbdd69856de9071https://connect.stripe.com/d/setup/e/_S7mmnIkGRgUhpUL4o36F0lublQ/YWNjdF8xUkRYQ1hGdHMwTDYyOVl2/bbfbdd69856de9071
//

const PaymentsList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
        try{
            const response =await axios.get('http://localhost:7001/api/fundTransfer/fetch-all-payments',{withCredentials: true})
            setPayments(response.data.charges);
        }catch(err){
          console.error(err);  
        }
    }
   fetchPayments();
  }, []);

  const handleSplit =async (payment) => {

    try{
        const response = await axios.post('http://localhost:7001/api/fundTransfer/split-payment', {
            amount: payment.amount,
            transferGroup: payment.transfer_group || `ORDER_${payment.id}`,
          },{withCredentials: true})

          if(response.status === 200){
            alert('Payment split successfully!');
          }
    }catch(err){
      console.error(err);  
    }

  };

  return (
    <div className='fundTransfer-Container'>
      <h2>Payments</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Email</th>
            <th>Amount</th>
            <th>Split</th>
          </tr>
        </thead>
        <tbody>
          {payments.map(p => (
            <tr key={p.id}>
              <td>{p.billing_details?.email || 'N/A'}</td>
              <td>${(p.amount / 100).toFixed(2)}</td>
              <td>
                <button onClick={() => handleSplit(p)}>Split Now</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsList;
