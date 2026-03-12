// AboutUs.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Aboutus.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <div className="about-hero-content">
          <h1 className="about-title">
            About <span className="highlight">RecipeShare</span>
          </h1>
          <p className="about-subtitle">
            Where passionate home cooks come together to inspire, learn, and celebrate the joy of cooking.
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="story-content">
          <h2>Our Story</h2>
          <p>
            RecipeShare was born in 2024 from a simple idea: food brings people together. 
            What started as a small group of friends sharing family recipes quickly grew into a vibrant community of thousands of home cooks, professional chefs, and food enthusiasts from around the world.
          </p>
          <p>
            We believe every dish has a story — whether it's your grandmother's secret masala recipe, a quick weeknight dinner hack, or an experimental fusion creation. Our mission is to make those stories accessible, discoverable, and celebrated.
          </p>
        </div>
      </section>

      <section className="mission-vision">
        <div className="mission-grid">
          <div className="mission-card">
            <h3>Our Mission</h3>
            <p>To empower everyone to cook with confidence by providing a platform to discover, share, and perfect recipes that fit any lifestyle, skill level, or craving.</p>
          </div>

          <div className="mission-card">
            <h3>Our Vision</h3>
            <p>A world where cooking is not a chore, but a joyful, creative expression — and where every home cook feels part of a supportive global community.</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Meet the Team</h2>
        <p className="team-intro">
          We're a small but passionate team of food lovers, developers, and designers dedicated to making RecipeShare the best place for recipe inspiration.
        </p>
        <div className="team-grid">
          <div className="team-member">
            <div className="member-avatar">👨‍💻</div>
            <h4>Patel Datt</h4>
            <p className="role">Founder & Co-Founder </p>
            <p>Welcome To RecipeShare, Where Every Recipe Tells A Story And Every Cook Is A Creator.</p>
          </div>

          <div className="team-member">
            <div className="member-avatar">👨‍💻</div>
            <h4>Jainil</h4>
            <p className="role">Lead Developer</p>
            <p>We Make Sure Your Recipes Load In A Flash — Even Before You Can Say “Mise En Place.” 🍽️✨.</p>
          </div>

          <div className="team-member">
            <div className="member-avatar">🎨</div>
            <h4>Vishwa</h4>
            <p className="role">UI/UX Designer</p>
            <p>Designing Seamless Experiences As Delightful As Your Beautifully Plated Dishes.</p>
          </div>
        </div>
      </section>

      <section className="join-cta">
        <div className="cta-content">
          <h2>Join Our Community</h2>
          <p>Be part of the movement — share your recipes, discover new favorites, and connect with fellow food lovers.</p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn primary-btn large">
              Sign Up Now
            </Link>
            <Link to="/recipes" className="btn secondary-btn large">
              Browse Recipes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;