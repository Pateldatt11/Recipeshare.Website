// src/context/RecipeContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { recipes as staticRecipes } from '../data';  // ← aa import karo (path adjust karjo if needed)

const RecipeContext = createContext();

export function RecipeProvider({ children }) {
  const [userRecipes, setUserRecipes] = useState(() => {
    const saved = localStorage.getItem('userRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  // Save user-added recipes to localStorage
  useEffect(() => {
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
  }, [userRecipes]);

  const addRecipe = (newRecipeData) => {
    const recipeToAdd = {
      id: Date.now() + Math.random().toString(36).slice(2), // unique ID
      name: newRecipeData.dishName || newRecipeData.name,
      description: newRecipeData.miniDescription || newRecipeData.description,
      time: newRecipeData.cookingTime || newRecipeData.time,
      difficulty: newRecipeData.difficulty || 'Medium',
      servings: newRecipeData.servings || '4',
      image: newRecipeData.imagePreview || 'https://images.unsplash.com/photo-1556911220-b0b895fafb40?auto=format&fit=crop&q=80&w=800',
      rating: newRecipeData.rating || '4.0',
      // ingredients & instructions – optional, add later if needed
      createdAt: new Date().toISOString(),
      isUserAdded: true, // to identify
    };

    setUserRecipes(prev => [recipeToAdd, ...prev]);
  };

  // All recipes = static (old) + user added (new)
  const allRecipes = [...userRecipes, ...staticRecipes];

  // Optional: for testing – clear user added only
  const clearUserRecipes = () => {
    setUserRecipes([]);
    localStorage.removeItem('userRecipes');
  };

  return (
    <RecipeContext.Provider value={{ 
      recipes: allRecipes, 
      addRecipe, 
      clearUserRecipes 
    }}>
      {children}
    </RecipeContext.Provider>
  );
}

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (!context) throw new Error('useRecipes must be inside RecipeProvider');
  return context;
};