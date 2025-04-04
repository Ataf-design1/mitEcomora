import React from 'react';
import { useFirebase } from '../Context/FirebaseContext';
import { Link } from 'react-router-dom';
import '../CSS/Wishlist.css';

const Wishlist = () => {
  const { user, wishlist, removeFromWishlist, addToCart } = useFirebase();

  if (!user) {
    return (
      <div className="wishlist-container">
        <div className="auth-options">
          <h2>Please login or register to view your wishlist</h2>
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/register" className="auth-button secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-container">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty</p>
          <Link to="/marketplace" className="shop-now-button">Shop Now</Link>
        </div>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.thumbnail} alt={item.title} className="item-image" />
              <div className="item-details">
                <h3>{item.title}</h3>
                <p className="item-description">{item.description}</p>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="item-actions">
                <button
                  onClick={() => addToCart(item)}
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="remove-button"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;