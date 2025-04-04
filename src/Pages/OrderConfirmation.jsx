import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFirebase } from '../Context/FirebaseContext';
import { doc, getDoc } from 'firebase/firestore';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const { db } = useFirebase();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderDoc = await getDoc(doc(db, 'orders', orderId));
        if (orderDoc.exists()) {
          setOrder({ id: orderDoc.id, ...orderDoc.data() });
        } else {
          setError('Order not found');
        }
      } catch (err) {
        setError('Failed to load order details');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId, db]);

  if (loading) {
    return <div className="confirmation-container">Loading...</div>;
  }

  if (error) {
    return (
      <div className="confirmation-container error">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/marketplace" className="shop-more-button">Return to Marketplace</Link>
      </div>
    );
  }

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <h1>Order Confirmed!</h1>
        <div className="order-details">
          <p>Order ID: {order.id}</p>
          <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
          <p>Delivery Address: MIT Campus</p>
          <p>Status: {order.status}</p>
        </div>
        <div className="order-items">
          <h2>Order Items</h2>
          {order.items.map((item, index) => (
            <div key={index} className="order-item">
              <span>{item.title}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="confirmation-actions">
          <Link to="/marketplace" className="shop-more-button">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;