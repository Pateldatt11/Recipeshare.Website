// src/Pages/RecipeDetail.jsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipes } from "../data"; // adjust path if your data.jsx is elsewhere
import "./RecipeDetail.css";
import TextType from "../Components/TextType";

const RecipeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find recipe by id (convert string → number)
  const recipe = recipes.find((r) => r.id === Number(id));

  if (!recipe) {
    return (
      <div className="recipe-detail-container">
        <div className="not-found">
          <h1>Recipe Not Found 😔</h1>
          <p>The recipe you're looking for doesn't exist or has been removed.</p>
          <button className="back-btn" onClick={() => navigate(-1)}>
            ← Back to Recipes
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="recipe-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to All Recipes
      </button>

      <section className="recipe-hero">
        <img
          src={recipe.image}
          alt={recipe.name}
          className="hero-image"
        />
        <div className="hero-overlay">
          {/* <h1 className="recipe-title">{recipe.name}</h1> */}

          <TextType
            text={[recipe.name]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="_"
            texts={["Welcome to React Bits! Good to see you!","Build some amazing experiences!"]}
            deletingSpeed={50}
            variableSpeedEnabled={false}
            variableSpeedMin={60}
            variableSpeedMax={120}
            cursorBlinkDuration={0.5}
            className="recipe-title"
          />
          <p className="recipe-subtitle">{recipe.description}</p>

          <div className="recipe-meta-large">
            {recipe.time && <span>⏱️ {recipe.time}</span>}
            {recipe.servings && <span>🍽️ Serves {recipe.servings}</span>}
            {recipe.difficulty && <span>🔥 {recipe.difficulty}</span>}
          </div>
        </div>
      </section>

      <section className="recipe-content-section">
        <div className="content-grid">
          {/* Ingredients */}
          <div className="ingredients-card">
            <h2>Ingredients</h2>
            <ul>
              {recipe.ingredients?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
              {!recipe.ingredients?.length && <li>No ingredients listed</li>}
            </ul>
          </div>

          {/* Instructions */}
          <div className="instructions-card">
            <h2>Instructions</h2>
            <ol>
              {recipe.instructions?.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
              {!recipe.instructions?.length && <li>No instructions available</li>}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetail;