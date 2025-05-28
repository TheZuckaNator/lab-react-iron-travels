import React, { useState } from 'react';
import travelPlansData from "./assets/travel-plans.json";

// Bonus Iteration 4: TravelPlanCard Component
const TravelPlanCard = ({ plan, onDelete, onFavorite, showFavoriteButton = false }) => {
  const [favoriteColors] = useState(["purple", "blue", "green", "yellow", "orange", "red"]);
  const [colorIndex, setColorIndex] = useState(0);

  const handleFavoriteClick = () => {
    onFavorite(plan);
    setColorIndex((prevIndex) => (prevIndex + 1) % favoriteColors.length);
  };

  // Determine labels based on cost and allInclusive
  const getLabels = () => {
    const labels = [];
    
    if (plan.totalCost <= 350) {
      labels.push({ text: "Great Deal", color: "#22c55e" });
    }
    
    if (plan.totalCost >= 1500) {
      labels.push({ text: "Premium", color: "#3b82f6" });
    }
    
    if (plan.allInclusive) {
      labels.push({ text: "All Inclusive", color: "#f59e0b" });
    }
    
    return labels;
  };

  const labels = getLabels();

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '8px',
      padding: '16px',
      marginBottom: '16px',
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <img 
        src={plan.image} 
        alt={plan.destination}
        style={{
          width: '100%',
          height: '200px',
          objectFit: 'cover',
          borderRadius: '8px',
          marginBottom: '12px'
        }}
      />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
        <h3 style={{ margin: '0', fontSize: '1.25rem', fontWeight: 'bold' }}>
          {plan.destination}
        </h3>
        <span style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1f2937' }}>
          €{plan.totalCost}
        </span>
      </div>
      
      <p style={{ color: '#6b7280', margin: '8px 0', lineHeight: '1.5' }}>
        {plan.description}
      </p>
      
      <p style={{ margin: '8px 0', color: '#374151' }}>
        <strong>Duration:</strong> {plan.days} days
      </p>
      
      {/* Labels */}
      {labels.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
          {labels.map((label, index) => (
            <span 
              key={index}
              style={{
                backgroundColor: label.color,
                color: 'white',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              {label.text}
            </span>
          ))}
        </div>
      )}
      
      {/* Buttons */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        {showFavoriteButton && (
          <button
            onClick={handleFavoriteClick}
            style={{
              backgroundColor: favoriteColors[colorIndex],
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1rem'
            }}
          >
            ♡
          </button>
        )}
        <button
          onClick={() => onDelete(plan.id)}
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '8px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '0.875rem'
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

// Main TravelList Component
const TravelList = () => {
  const [travelPlans, setTravelPlans] = useState(travelPlansData);
  const [favorites, setFavorites] = useState([]);

  // Iteration 3: Delete functionality
  const handleDelete = (planId) => {
    setTravelPlans(travelPlans.filter(plan => plan.id !== planId));
  };

  const handleDeleteFavorite = (planId) => {
    setFavorites(favorites.filter(plan => plan.id !== planId));
  };

  // Bonus Iteration 5: Add to favorites
  const handleAddToFavorites = (plan) => {
    // Check if plan is already in favorites
    if (!favorites.find(fav => fav.id === plan.id)) {
      setFavorites([...favorites, plan]);
    }
  };

  return (
    <div style={{ 
      padding: '20px',
      backgroundColor: '#f9fafb',
      minHeight: '100vh'
    }}>
      <h1 style={{ 
        textAlign: 'center', 
        fontSize: '2.5rem', 
        fontWeight: 'bold', 
        marginBottom: '2rem',
        color: '#1f2937'
      }}>
        Iron Travels
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: favorites.length > 0 ? '1fr 1fr' : '1fr',
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Main travel plans list */}
        <div>
          <h2 style={{ 
            fontSize: '1.875rem', 
            fontWeight: 'bold', 
            marginBottom: '1.5rem',
            color: '#374151'
          }}>
            Travel Plans ({travelPlans.length})
          </h2>
          
          {travelPlans.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '1.125rem' }}>
              No travel plans available
            </p>
          ) : (
            travelPlans.map(plan => (
              <TravelPlanCard 
                key={plan.id}
                plan={plan}
                onDelete={handleDelete}
                onFavorite={handleAddToFavorites}
                showFavoriteButton={true}
              />
            ))
          )}
        </div>
        
        {/* Bonus Iteration 5: Favorites list */}
        {favorites.length > 0 && (
          <div>
            <h2 style={{ 
              fontSize: '1.875rem', 
              fontWeight: 'bold', 
              marginBottom: '1.5rem',
              color: '#374151'
            }}>
              Favorites ({favorites.length})
            </h2>
            
            {favorites.map(plan => (
              <TravelPlanCard 
                key={`fav-${plan.id}`}
                plan={plan}
                onDelete={handleDeleteFavorite}
                onFavorite={() => {}} // No favorite button in favorites list
                showFavoriteButton={false}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  return <TravelList />;
};

export default App;