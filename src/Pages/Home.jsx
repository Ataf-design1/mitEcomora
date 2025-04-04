import React from 'react';
import '../CSS/Home.css';
import { NavLink } from 'react-router-dom';
import { useFirebase } from '../Context/FirebaseContext';

const Home = () => {
  const { user } = useFirebase();

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to the MIT Student Marketplace</h1>
          <p>
            Simplify your student life with curated packages, exclusive deals, and personalized
            recommendations. Start your journey with ease!
          </p>
          <div className="cta-buttons">
            <NavLink to="/marketplace" className="btn-primary">Explore Marketplace</NavLink>
            <NavLink to="/packages" className="btn-secondary">View Packages</NavLink>
          </div>
        </div>
        <div className="hero-image">
          <img
            src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
            alt="Marketplace Illustration"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2>About Us</h2>
        <p>
          The MIT Student Marketplace is designed to simplify the onboarding process for students,
          especially international students. From curated packages of essentials to exclusive
          discounts and personalized recommendations, we are here to make your transition to MIT
          seamless and cost-effective.
        </p>
      </section>

      {/* Key Features Section */}
      <section className="features">
        <h2>What We Offer</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Curated Essentials</h3>
            <p>Ready-to-use bundles tailored to your unique needs.</p>
          </div>
          <div className="card">
            <h3>Personalized Recommendations</h3>
            <p>AI-powered suggestions for items you'll love.</p>
          </div>
          <div className="card">
            <h3>Exclusive Discounts</h3>
            <p>Save more with student-friendly deals.</p>
          </div>
          <div className="card">
            <h3>Community Support</h3>
            <p>Read reviews, share feedback, and connect with peers.</p>
          </div>
          <div className="card">
            <h3>Seamless Experience</h3>
            <p>Fast, secure checkout with multiple payment options.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <h2>What Students Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial">
            <p>"I found everything I needed within minutes. The curated packages are a lifesaver!"</p>
            <h4>- Jane D., Graduate Student</h4>
          </div>
          <div className="testimonial">
            <p>"The exclusive discounts helped me set up my dorm without breaking the bank!"</p>
            <h4>- John M., International Student</h4>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        {user ? (
          <p className="welcome-message">Welcome, {user.email.split('@')[0]}!</p>
        ) : (
          <NavLink to="/register" className="btn-primary">Sign Up Now</NavLink>
        )}
      </section>
    </div>
  );
};

export default Home;
