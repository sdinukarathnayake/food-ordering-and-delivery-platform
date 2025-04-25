import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderDetails.css';

function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/orders/view/${id}`)
      .then(res => setOrder(res.data))
      .catch(err => console.error("Failed to load order:", err));
  }, [id]);

  if (!order) return <p>Loading order details...</p>;

  return (
    <div className="order-details-container">
      <h2>Order Details</h2>
      <p><strong>Order ID:</strong> {order.orderId}</p>
      <p><strong>Status:</strong> {order.orderStatus}</p>
      <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
      <p><strong>Total:</strong> Rs. {order.totalAmount}</p>
      <h3>Items:</h3>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>
            {item.itemId} × {item.quantity} = Rs. {item.quantity * item.price}
          </li>
        ))}
      </ul>
      <p><strong>Delivery Address:</strong> {order.deliveryLocationLatitude}, {order.deliveryLocationLongitude}</p>
      <p><strong>Notes:</strong> {order.notes || 'N/A'}</p>
    </div>
  );
}

export default OrderDetails;
