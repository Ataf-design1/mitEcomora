import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../Context/FirebaseContext';
import '../CSS/Navbar.css';

const Navbar = () => {
  const { user, cart, wishlist } = useFirebase();

  return (
    <nav className="navbar">
      <h1 className="navbar-title">Ecomora</h1>
      <div className="navbar-links">
        <NavLink to="/" className="nav-link">Home</NavLink>
        <NavLink to="/marketplace" className="nav-link">Products</NavLink>
        <NavLink to="/packages" className="nav-link">Packages</NavLink>
        {user ? (
          <>
            <NavLink to="/profile" className="nav-link">Profile</NavLink>
            <NavLink to="/wishlist" className="nav-link wishlist-link">
              Wishlist ({wishlist.length})
            </NavLink>
            <NavLink to="/cart" className="nav-link cart-link">
              Cart ({cart.length})
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login" className="nav-link">Login</NavLink>
            <NavLink to="/register" className="nav-link">Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;