import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import GlareHover from '../Components/GlareHover';
import './Recipes.css';

const Recipes = () => {
  const navigate = useNavigate();
  const { recipes = [] } = useRecipes() || {};

  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter((recipe) =>
    (recipe?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (recipe?.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRecipes = [...filteredRecipes].sort((a, b) => {
    const dateA = a?.createdAt ? new Date(a.createdAt) : new Date(0);
    const dateB = b?.createdAt ? new Date(b.createdAt) : new Date(0);
    return dateB - dateA;
  });

  return (
    <div className="recipes-container">
      <section className="recipes-hero">
        <div className="recipes-hero-content">
          <h1 className="recipes-title">
            Explore Our <span className="highlight">Recipes</span>
          </h1>
          <p className="recipes-subtitle">
            Discover delicious dishes from quick everyday meals to special occasion favorites...
          </p>
        </div>
      </section>

      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by recipe name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="button">🔍</button>
        </div>
      </div>

      <section className="recipes-grid-section">
        {sortedRecipes.length === 0 ? (
          <div className="no-results">
            <p>No recipes found for "{searchTerm}"</p>
            <small>Try a different keyword or clear the search</small>
          </div>
        ) : (
          <div className="recipes-grid">
            {sortedRecipes.map((recipe) => (
              <GlareHover
                key={recipe.id}
                width="100%"
                height="auto"
                background="#1a1a1a"
                borderRadius="16px"
                borderColor="#2a2a2a"
                glareColor="#ff4136"
                glareOpacity={0.22}
                glareAngle={-38}
                glareSize={320}
                transitionDuration={750}
                className="recipe-card"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/recipe/${recipe.id}`)}
              >
                <div className="recipe-image-wrapper">
                  <img
                    src={recipe.image}
                    alt={recipe.name}
                    className="recipe-image"
                  />
                </div>

                <div className="recipe-content">
                  <h3 className="recipe-name">{recipe.name}</h3>
                  <p className="recipe-description">{recipe.description}</p>
                  <div className="recipe-meta">
                    <span>⏱️ {recipe.time}</span>
                    <span>🍽️ {recipe.servings}</span>
                    <span>Level: {recipe.difficulty}</span>
                    {recipe.rating && <span>⭐ {recipe.rating}</span>}
                  </div>
                </div>
              </GlareHover>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Recipes;