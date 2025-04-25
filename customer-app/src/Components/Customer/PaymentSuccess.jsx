import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentSuccess() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/dashboard'); // or whatever your path is
        }, 3000);
    }, []);

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1>🎉 Payment Successful!</h1>
            <p>Redirecting to your dashboard...</p>
        </div>
    );
}

export default PaymentSuccess;
