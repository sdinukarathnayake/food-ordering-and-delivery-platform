import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updatePaymentStatus = async () => {
      const sessionId = new URLSearchParams(location.search).get('orderId');
      
      if (!sessionId) {
        console.error('Session ID not found in URL');
        return;
      }

      try {
        // Send request to backend to update paymentStatus to "Paid"
        await axios.put(`http://localhost:5000/orders/mark-paid/${sessionId}`);
        console.log('Payment status updated successfully!');
      } catch (error) {
        console.error('Error updating payment status:', error);
      }

      // Redirect user back to dashboard after 3 seconds
      setTimeout(() => {
        navigate('/Customer'); // 🔥 Your dashboard route
      }, 3000);
    };

    updatePaymentStatus();
  }, [location, navigate]);

  return (
    <div className="payment-success-container">
      <h1>✅ Payment Successful!</h1>
      <p>Thank you for your payment. You will be redirected shortly...</p>
    </div>
  );
}

export default PaymentSuccess;
