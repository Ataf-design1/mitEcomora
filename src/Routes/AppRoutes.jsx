import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../Pages/Home';
import MarketPlace from '../Pages/MarketPlace';
import Packages from '../Pages/Packages';
import Profile from '../Pages/Profile';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import Cart from '../Pages/Cart';
import Wishlist from '../Pages/Wishlist';
import OrderConfirmation from '../Pages/OrderConfirmation';

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/marketplace" element={<MarketPlace />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
      </Routes>
    </div>
  );
};

export default AppRoutes;