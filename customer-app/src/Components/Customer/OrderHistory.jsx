import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './OrderHistory.css';

function OrderHistory() {
  const { username } = useParams();
  const [orders, setOrders] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/orders/view-history/${username}`);
        setOrders(res.data);
      } catch (err) {
        console.error('Error fetching order history:', err);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const res = await axios.get('http://localhost:5004/api/menu/list', {
          withCredentials: true
        });
        if (res.data.success) {
          setMenuItems(res.data.data);
        }
      } catch (err) {
        console.error('Error fetching menu items:', err);
      }
    };

    fetchOrders();
    fetchMenuItems();
  }, [username]);

  const getItemName = (id) => {
    return menuItems.find((item) => item.menuId === id)?.name || 'Unknown';
  };

  const completedOrders = orders.filter(o => o.orderStatus === 'delivered' || o.orderStatus === 'cancelled');
  const otherOrders = orders.filter(o => o.orderStatus !== 'delivered' && o.orderStatus !== 'cancelled');

  completedOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));

  const renderOrder = (order) => (
    <div
      key={order.orderId}
      className={`order-card ${order.orderStatus === 'delivered' ? 'completed' : order.orderStatus === 'cancelled' ? 'cancelled' : ''}`}
    >
      <h3>Order ID: {order.orderId}</h3>
      <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
      <p><strong>Status:</strong> <span className={`order-status ${order.orderStatus}`}>{order.orderStatus}</span></p>

      <h4>Customer Info</h4>
      <p>{order.customerName} ({order.customerUsername})</p>
      <p>{order.customerPhone} | {order.customerEmail}</p>

      <h4>Delivery Location</h4>
      <p>{order.deliveryLocationLatitude}, {order.deliveryLocationLongitude}</p>

      <h4>Restaurant</h4>
      <p>{order.restaurantName} ({order.restaurantPhone})</p>

      <h4>Items</h4>
      <ul>
        {order.items.map((item, index) => (
          <li key={index}>{getItemName(item.itemId)} - {item.quantity} × Rs.{item.price}</li>
        ))}
      </ul>

      <h4>Pricing</h4>
      <p>Subtotal: Rs.{order.subtotal}</p>
      <p>Delivery Charge: Rs.{order.deliveryCharge}</p>
      <p><strong>Total Amount:</strong> Rs.{order.totalAmount}</p>

      <h4>Payment</h4>
      <p>Method: {order.paymentMethod}</p>
      <p>Status: {order.paymentStatus}</p>

      {order.notes && (
        <>
          <h4>Notes</h4>
          <p>{order.notes}</p>
        </>
      )}
    </div>
  );

  return (
    <div className="order-history-page">
      <h2 className="history-heading">Order History for {username}</h2>

      {otherOrders.length > 0 && (
        <div>
          <h3>Active Orders</h3>
          {otherOrders.map(renderOrder)}
        </div>
      )}

      {completedOrders.length > 0 && (
        <div>
          <h3>Completed Orders</h3>
          {completedOrders.map(renderOrder)}
        </div>
      )}

      {orders.length === 0 && <p>No orders found for this user.</p>}
    </div>
  );
}

export default OrderHistory;
