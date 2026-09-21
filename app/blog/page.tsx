'use client';

import { recipes } from '../../lib/recipes';
import { useState } from 'react';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

  const categories = ['All', 'Classic', 'Dessert', 'Fusion', 'Cocktail', 'Party'];
  
  const filteredRecipes = selectedCategory === 'All' 
    ? recipes 
    : recipes.filter(r => r.category === selectedCategory);

  return (
    <div className="blog-container">
      <div className="blog-header">
        <h1 className="blog-title">
          Recipe Hub 
          <span className="title-emoji">📖</span>
        </h1>
        <p className="blog-subtitle">
          Level up your jelly game with these fire recipes. Your taste buds will thank you.
        </p>
      </div>

      <div className="category-filter">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="recipes-grid">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <div className="recipe-header">
              <span className="recipe-emoji">{recipe.emoji}</span>
              <span className="recipe-category">{recipe.category}</span>
            </div>
            <h3 className="recipe-title">{recipe.title}</h3>
            <p className="recipe-description">{recipe.description}</p>
            
            <div className="recipe-meta">
              <span className="meta-item">
                <span className="meta-icon">⏱️</span>
                {recipe.time}
              </span>
              <span className="meta-item">
                <span className="meta-icon">📊</span>
                {recipe.difficulty}
              </span>
            </div>

            <button
              className="expand-button"
              onClick={() => setExpandedRecipe(expandedRecipe === recipe.id ? null : recipe.id)}
            >
              {expandedRecipe === recipe.id ? 'Show Less ▲' : 'View Recipe ▼'}
            </button>

            {expandedRecipe === recipe.id && (
              <div className="recipe-details">
                <div className="recipe-section">
                  <h4>Ingredients:</h4>
                  <ul>
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </div>
                <div className="recipe-section">
                  <h4>Instructions:</h4>
                  <ol>
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <style jsx>{`
        .blog-container {
          min-height: 100vh;
          background: linear-gradient(180deg, #fff5f8 0%, #f0f4ff 50%, #fff0f5 100%);
          padding: 2rem;
        }

        .blog-header {
          text-align: center;
          max-width: 800px;
          margin: 0 auto 3rem;
        }

        .blog-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-emoji {
          font-size: 3rem;
        }

        .blog-subtitle {
          font-size: 1.3rem;
          color: #666;
        }

        .category-filter {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin-bottom: 3rem;
          flex-wrap: wrap;
        }

        .category-button {
          padding: 0.75rem 1.5rem;
          border: 2px solid #c44cff;
          background: white;
          color: #c44cff;
          border-radius: 50px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-button:hover {
          background: #c44cff;
          color: white;
          transform: translateY(-2px);
        }

        .category-button.active {
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          color: white;
          border-color: transparent;
        }

        .recipes-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .recipe-card {
          background: white;
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
        }

        .recipe-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .recipe-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .recipe-emoji {
          font-size: 3rem;
        }

        .recipe-category {
          background: linear-gradient(135deg, #ff6b9d, #c44cff);
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .recipe-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #333;
        }

        .recipe-description {
          color: #666;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .recipe-meta {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: #666;
          font-size: 0.9rem;
        }

        .meta-icon {
          font-size: 1.2rem;
        }

        .expand-button {
          width: 100%;
          background: linear-gradient(135deg, #ff6b9d 0%, #c44cff 50%, #6b5bff 100%);
          border: none;
          color: white;
          padding: 0.75rem;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .expand-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(196, 76, 255, 0.3);
        }

        .recipe-details {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 2px solid #f0f0f0;
          animation: slideDown 0.3s ease;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .recipe-section {
          margin-bottom: 1.5rem;
        }

        .recipe-section h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          color: #333;
        }

        .recipe-section ul,
        .recipe-section ol {
          margin: 0;
          padding-left: 1.5rem;
          color: #666;
          line-height: 1.8;
        }

        .recipe-section li {
          margin-bottom: 0.5rem;
        }

        @media (max-width: 768px) {
          .blog-title {
            font-size: 2rem;
          }

          .recipes-grid {
            grid-template-columns: 1fr;
          }

          .category-filter {
            gap: 0.5rem;
          }

          .category-button {
            padding: 0.5rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </div>
  );
}
