import React, { useState } from 'react';
import { useFirebase } from '../Context/FirebaseContext';
import { Link, useNavigate } from 'react-router-dom';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '../Components/alertDialog'; 
import '../CSS/Cart.css';

const Cart = () => {
  const { user, cart, removeFromCart, clearCart } = useFirebase();
  const navigate = useNavigate();
  const [isCheckoutDialogOpen, setIsCheckoutDialogOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showReviews, setShowReviews] = useState({});

  // Calculate total price
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

  // Handle one-click checkout
  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Here you would typically:
      // 1. Process payment
      // 2. Create order in database
      // 3. Send confirmation email
      // 4. Clear cart
      
      clearCart();
      navigate('/OrderConfirmation');
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
      setIsCheckoutDialogOpen(false);
    }
  };

  // Toggle reviews for an item
  const toggleReviews = (itemId) => {
    setShowReviews(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  if (!user) {
    return (
      <div className="cart-container">
        <div className="auth-options">
          <h2>Please login or register to view your cart</h2>
          <div className="auth-buttons">
            <Link to="/login" className="auth-button">Login</Link>
            <Link to="/register" className="auth-button secondary">Register</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/marketplace" className="shop-now-button">Shop Now</Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.thumbnail} alt={item.title} className="item-image" />
                <div className="item-details">
                  <div>
                    <h3>{item.title}</h3>
                    <p className="item-description">{item.description}</p>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                    
                    {/* Student Reviews Section */}
                    <button 
                      className="reviews-toggle"
                      onClick={() => toggleReviews(item.id)}
                    >
                      {showReviews[item.id] ? 'Hide Reviews' : 'Show Student Reviews'}
                    </button>
                    
                    {showReviews[item.id] && (
                      <div className="student-reviews">
                        <div className="review">
                          <div className="review-header">
                            <span className="reviewer">Sarah K. (Course 6)</span>
                            <span className="rating">★★★★★</span>
                          </div>
                          <p>Perfect for my dorm room setup! Great value for money.</p>
                        </div>
                        <div className="review">
                          <div className="review-header">
                            <span className="reviewer">Mike T. (Course 2)</span>
                            <span className="rating">★★★★</span>
                          </div>
                          <p>Good quality, shipped quickly to my dorm.</p>
                        </div>
                      </div>
                    )}
                  </div>
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
          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-details">
              <p>Subtotal: ${totalPrice.toFixed(2)}</p>
              <p>Shipping: FREE</p>
              <div className="total">
                <h3>Total:</h3>
                <h3>${totalPrice.toFixed(2)}</h3>
              </div>
              <button 
                className={`checkout-button ${isProcessing ? 'processing' : ''}`}
              >
                {isProcessing ? 'Processing...' : 'One-Click Checkout'}
              </button>
              <p className="checkout-info">
                MIT student verified ✓ Free delivery to campus
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Confirmation Dialog */}
      <AlertDialog open={isCheckoutDialogOpen} onOpenChange={setIsCheckoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm One-Click Checkout</AlertDialogTitle>
            <AlertDialogDescription>
              Your order will be delivered to your MIT campus address. 
              Total amount: ${totalPrice.toFixed(2)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCheckout} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Confirm Purchase'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Cart;