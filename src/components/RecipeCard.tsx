import React from 'react';
import styled from 'styled-components';
import { Recipe } from '../types/recipe';

// Styled card container for each recipe preview
const Card = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(44, 62, 80, 0.08);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: box-shadow 0.22s cubic-bezier(0.4,0,0.2,1), background 0.3s, transform 0.18s, border 0.18s;
  border: 2.5px solid transparent;
  will-change: transform, box-shadow, border;
  cursor: pointer;
  &:hover {
    box-shadow: 0 12px 48px ${({ theme }) => theme.accent}66, 0 2px 24px #0002;
    transform: scale(1.035);
    border: 2.5px solid ${({ theme }) => theme.accent};
    background: ${({ theme }) => theme.card};
  }
`;

// Recipe image at the top of the card
const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

// Content area for title, description, and tags
const CardContent = styled.div`
  padding: 20px 18px 18px 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

// Recipe title
const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

// Recipe description
const CardDesc = styled.p`
  color: ${({ theme }) => theme.subtext};
  font-size: 1rem;
  margin-bottom: 1.2rem;
  flex: 1;
`;

// Container for recipe tags
const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// Individual tag badge
const CardTag = styled.span`
  background: ${({ theme }) => theme.accent2};
  color: #fff;
  font-size: 0.85rem;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
`;

// Props for the RecipeCard component
interface RecipeCardProps {
  recipe: Recipe; // The recipe to display
  onClick: (id: number) => void; // Handler for when the card is clicked
}

/**
 * A reusable card component for displaying recipe previews
 * @param recipe - The recipe data to display
 * @param onClick - Function to call when the card is clicked
 */
const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    // Card container, clickable
    <Card onClick={() => onClick(recipe.id)}>
      {/* Recipe image */}
      <CardImage src={recipe.image} alt={recipe.name} />
      {/* Card content: title, description, tags */}
      <CardContent>
        <CardTitle>{recipe.name}</CardTitle>
        <CardDesc>{recipe.description}</CardDesc>
        <CardTags>
          {recipe.tags.map(tag => (
            <CardTag key={tag}>{tag}</CardTag>
          ))}
        </CardTags>
      </CardContent>
    </Card>
  );
};

export default RecipeCard; 