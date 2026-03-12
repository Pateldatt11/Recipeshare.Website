// src/Pages/RecipeShare.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecipes } from '../context/RecipeContext';
import './RecipeShare.css';

const RecipeShare = () => {
  const { addRecipe } = useRecipes();

  const [formData, setFormData] = useState({
    dishName: '',
    miniDescription: '',
    cookingTime: '',
    difficulty: 'Medium',
    rating: '4',
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.dishName.trim() || !formData.miniDescription.trim() || !formData.cookingTime.trim()) {
      setError('Please fill all required fields');
      return;
    }

    addRecipe(formData, imagePreview);

    alert(`"${formData.dishName}" shared successfully!`);

    // Reset
    setFormData({
      dishName: '',
      miniDescription: '',
      cookingTime: '',
      difficulty: 'Medium',
      rating: '4',
    });
    setImagePreview(null);
    setError('');

    // Clean up preview URL
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  };

  return (
    <div className="share-container">
      <section className="share-hero">
        <div className="share-hero-content">
          <h1>Share Your Recipe</h1>
          <p>Let everyone enjoy your creation ✨</p>
        </div>
      </section>

      <section className="share-form-section">
        <form onSubmit={handleSubmit} className="recipe-form">
          {error && <div className="form-error">{error}</div>}

          <div className="form-group">
            <label>Dish Name *</label>
            <input
              type="text"
              name="dishName"
              value={formData.dishName}
              onChange={handleChange}
              placeholder="e.g. Gujarati Undhiyu"
              required
            />
          </div>

          <div className="form-group">
            <label>Short Description *</label>
            <textarea
              name="miniDescription"
              value={formData.miniDescription}
              onChange={handleChange}
              placeholder="Traditional mixed vegetable dish cooked upside down..."
              rows="4"
              required
            />
          </div>

          <div className="form-group">
            <label>Cooking Time *</label>
            <input
              type="text"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              placeholder="e.g. 1 hour 30 mins"
              required
            />
          </div>

          <div className="form-group">
            <label>Difficulty Level</label>
            <select name="difficulty" value={formData.difficulty} onChange={handleChange}>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div className="form-group">
            <label>Your Rating (1–5)</label>
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="0.5"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Recipe Photo (optional)</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview-container">
                <img src={imagePreview} alt="Preview" className="image-preview" />
              </div>
            )}
          </div>

          <div className="form-actions">
            <button type="submit" className="btn primary-btn large">
              Share Recipe
            </button>
            <Link to="/recipes" className="btn secondary-btn large">
              Cancel
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
};

export default RecipeShare;