import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import './Customer.css';

function Customer() {
    const [customer, setCustomer] = useState('');
    const [restaurants, setRestaurants] = useState([]);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [selectedRestaurantDetails, setSelectedRestaurantDetails] = useState(null);
    const [cart, setCart] = useState([]);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) return;
  
      const { name } = jwtDecode(token);

      axios.get(`http://localhost:5002/customer/view/${name}`, {
        withCredentials: false
      })  
      .then(res => setCustomer(res.data))
      .catch(err => console.error(err));


      axios.get('http://localhost:5004/api/restaurant/list')
      .then(res => {
        if (res.data.success) {
          const openedRestaurants = res.data.data.filter(r => r.status === 'Opened');
          setRestaurants(openedRestaurants);
        }
      })
      .catch(err => console.error(err));

    }, []);

    
    const handleRestaurantClick = async (restaurantId) => {
      setSelectedRestaurant(restaurantId);
      const restDetails = restaurants.find(r => r.restaurantId === restaurantId);
      setSelectedRestaurantDetails(restDetails);
    
      try {
        const res = await axios.get('http://localhost:5004/api/menu/list', {
          withCredentials: true
        });
    
        if (res.data.success) {
          const itemsForRestaurant = res.data.data.filter(item => item.restaurantId === restaurantId);
          setMenuItems(itemsForRestaurant);
        }
      } catch (err) {
        console.error('Failed to load menu items:', err);
      }
    };


    const handleAddToCart = (item) => {
      const updatedCart = [...cart];
      const existingItem = updatedCart.find(ci => ci.itemId === item.menuId);
      if (existingItem) {
          existingItem.quantity += 1;
      } else {
          updatedCart.push({
              itemId: item.menuId,
              name: item.name,
              quantity: 1,
              price: item.price
          });
      }
      setCart(updatedCart);
  };


  const updateQuantity = (itemId, delta) => {
      const updatedCart = cart.map(item => {
          if (item.itemId === itemId) {
              const newQty = item.quantity + delta;
              return { ...item, quantity: newQty > 0 ? newQty : 1 };
          }
          return item;
      });
      setCart(updatedCart);
  };

  const handleCreateCart = async () => {
    if (!customer || !selectedRestaurantDetails || cart.length === 0) return;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {     
        await axios.post('http://localhost:5003/cart', {
            name: customer.name,
            restaurantId: selectedRestaurantDetails.restaurantId,
            items: cart.map(item => ({
                itemId: item.itemId,
                quantity: item.quantity,
                price: item.price
            })),
            subtotal
        });
        alert('Cart submitted!');
        setCart([]);
        setShowCart(false);
    } catch (err) {
        console.error('Failed to create cart:', err);
    }
};
    

    return (

      <div className="customer-dashboard">
      <hr className="divider" />
      {customer && <h1 className="welcome">Welcome, {customer.customerName} 👋</h1>}

      {!selectedRestaurant ? (
          <div className="restaurant-grid">
              {restaurants.map((res) => (
                  <div key={res.restaurantId} className="restaurant-card" onClick={() => handleRestaurantClick(res.restaurantId)}>
                      <img
                          src={`http://localhost:5004/images/${res.restaurantPhoto}`}
                          alt={res.restaurantName}
                          className="restaurant-img"
                      />
                      <div className="restaurant-info">
                          <h3>{res.restaurantName}</h3>
                          <p>{res.restaurantLocation}</p>
                          <span className="status-open">{res.status}</span>
                      </div>
                  </div>
              ))}
          </div>
      ) : (
          <div className="menu-section">
              {selectedRestaurantDetails && (
                  <div className="menu-restaurant-info">
                      <img
                          src={`http://localhost:5004/images/${selectedRestaurantDetails.restaurantPhoto}`}
                          alt={selectedRestaurantDetails.restaurantName}
                          className="restaurant-banner-img"
                      />
                      <div className="restaurant-summary">
                          <h2 className="restaurant-name">{selectedRestaurantDetails.restaurantName}</h2>
                          <p className="restaurant-address">{selectedRestaurantDetails.restaurantLocation}</p>
                          <p className="restaurant-meta">⭐ 4.8 (180+) • Rs.99 Delivery Fee • 35 min</p>
                      </div>
                  </div>
              )}

              {menuItems.length === 0 ? (
                  <p>No menu items found.</p>
              ) : (
                  <div className="menu-list">
                      {menuItems.map(item => (
                          <div key={item.menuId} className="menu-item">
                              <div className="menu-item-info">
                                  <h4 className="menu-title">{item.name}</h4>
                                  <p className="menu-meta">LKR {item.price.toFixed(2)} • 👍 90% (45)</p>
                                  <p className="menu-description">{item.description}</p>
                              </div>
                              <div className="menu-item-img-wrap">
                                  <img
                                      src={`http://localhost:5004/images/${item.image}`}
                                      alt={item.name}
                                      className="menu-item-img"
                                  />
                                  <button className="menu-add-btn" onClick={() => handleAddToCart(item)}>+</button>
                              </div>
                          </div>
                      ))}
                  </div>
              )}

              <button onClick={() => setSelectedRestaurant(null)} className="back-btn">Back to Restaurants</button>
          </div>
      )}

      {cart.length > 0 && !showCart && (
          <div className="cart-floating" onClick={() => setShowCart(true)}>
              🛒 {cart.reduce((sum, item) => sum + item.quantity, 0)} items | LKR {cart.reduce((sum, item) => sum + item.quantity * item.price, 0).toFixed(2)} – View Cart
          </div>
      )}

      {showCart && (
          <div className="cart-panel">
              <h3>Your Cart</h3>
              {cart.map(item => (
                  <div key={item.itemId} className="cart-item">
                      <span>{item.name}</span>
                      <div className="cart-qty-control">
                          <button onClick={() => updateQuantity(item.itemId, -1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.itemId, 1)}>+</button>
                      </div>
                      <span>LKR {(item.price * item.quantity).toFixed(2)}</span>
                  </div>
              ))}
              <div className="cart-total">Subtotal: LKR {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</div>
              <button className="checkout-btn" onClick={handleCreateCart}>Checkout</button>
              <button className="close-cart" onClick={() => setShowCart(false)}>Close</button>
          </div>
      )}
  </div>
);

}

export default Customer;
