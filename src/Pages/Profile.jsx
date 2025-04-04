import React from 'react';
import { useFirebase } from '../Context/FirebaseContext';
import { Link } from 'react-router-dom';
import '../CSS/Profile.css';

const Profile = () => {
  const { user, logout, cart, wishlist, removeFromCart, addToCart, removeFromWishlist } = useFirebase();

  if (!user) {
    return (
      <div className="profile-container">
        <div className="auth-options">
          <h2>Please login or register to continue</h2>
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/register" className="auth-button secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCartFromWishlist = (item) => {
    addToCart(item); // Add the item to the cart
    removeFromWishlist(item.id); // Remove the item from the wishlist
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <h2>Welcome, {user.email}</h2>
        <div className="profile-sections">
          {/* Cart Section */}
          <div className="profile-section">
            <h3>My Cart</h3>
            {cart.length === 0 ? (
              <p>Your cart is empty. <Link to="/marketplace">Shop Now</Link></p>
            ) : (
              <div className="profile-cart-items">
                {cart.map((item) => (
                  <div key={item.id} className="profile-cart-item">
                    <img src={item.thumbnail} alt={item.title} className="item-image" />
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <p>${item.price.toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
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

          {/* Wishlist Section */}
          <div className="profile-section">
            <h3>My Wishlist</h3>
            {wishlist.length === 0 ? (
              <p>Your wishlist is empty. <Link to="/marketplace">Shop Now</Link></p>
            ) : (
              <div className="profile-wishlist-items">
                {wishlist.map((item) => (
                  <div key={item.id} className="profile-wishlist-item">
                    <img src={item.thumbnail} alt={item.title} className="item-image" />
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      <p>${item.price.toFixed(2)}</p>
                      <div className="item-actions">
                        <button
                          onClick={() => handleAddToCartFromWishlist(item)}
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
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>
    </div>
  );
};

export default Profile;
