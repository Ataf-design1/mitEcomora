import React from 'react';
import '../CSS/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>
            The MIT Student Marketplace is a platform designed to simplify student life by
            providing curated packages, exclusive deals, and personalized recommendations.
          </p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/marketplace">Marketplace</a></li>
            <li><a href="/packages">Packages</a></li>
            <li><a href="/profile">Profile</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: support@mitmarketplace.com</p>
          <p>Phone: +1 (617) 123-4567</p>
          <p>Address: 77 Massachusetts Ave, Cambridge, MA 02139</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 MIT Student Marketplace. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
