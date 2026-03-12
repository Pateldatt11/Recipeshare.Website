import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Discover & Share{" "}
            <span className="highlight">Delicious Recipes</span>
          </h1>
          <p className="hero-subtitle">
            Join thousands Of Food Lovers Sharing Their Favorite Homemade
            Dishes, Secret Family Recipes, And Creative Twists.
          </p>

          <div className="hero-buttons">
            <Link to="/recipes" className="btn primary-btn">
              Explore Recipes
            </Link>
            <Link to="/share" className="btn secondary-btn">
              Share Your Recipe
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">Why RecipeShare?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🍳</div>
            <h3>Thousands of Recipes</h3>
            <p>
              From quick weeknight dinners to weekend baking projects — find
              inspiration for every occasion.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">❤️</div>
            <h3>Community Favorites</h3>
            <p>
              Discover the most loved and highly rated recipes from passionate
              home cooks like you.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📸</div>
            <h3>Beautiful Photos</h3>
            <p>
              Every recipe comes with mouth-watering step-by-step photos to
              guide you.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Easy Search & Filters</h3>
            <p>
              Find exactly what you're craving — by cuisine, diet, time,
              difficulty, or ingredients.
            </p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Start Cooking?</h2>
          <p>
            Join our community today and share your culinary creations with the
            world!
          </p>
          <Link to="/signup" className="btn primary-btn large">
            Get Started — It's Free
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
