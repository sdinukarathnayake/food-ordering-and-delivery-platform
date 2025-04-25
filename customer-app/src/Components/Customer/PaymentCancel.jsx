import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentCancel() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate('/');
    }, 4000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ color: 'red' }}>Payment Cancelled ❌</h1>
      <p>Redirecting to home...</p>
    </div>
  );
}

export default PaymentCancel;
