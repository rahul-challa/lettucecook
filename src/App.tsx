// App.tsx
// Main application file for LettuceCook

import React, { useState, useRef } from 'react';
import styled, { createGlobalStyle, ThemeProvider, DefaultTheme, keyframes } from 'styled-components';
import { HashRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import heroPlate from './assets/hero-plate.png';
import { tags, recipes } from './data/recipes';
import RecipeDetail from './components/RecipeDetail';
import RecipeCard from './components/RecipeCard';

// --- Theme and Global Styles ---

// Define the theme type for styled-components
interface Theme {
  background: string;
  card: string;
  text: string;
  subtext: string;
  accent: string;
  accent2: string;
  tagBg: string;
  tagText: string;
  searchBg: string;
  glass: string;
  heroLeft: string;
  heroRight: string;
  heroAmber: string;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}

// Main accent color
const YELLOW = '#FFB300';

// Dark mode theme object
const darkAmberTheme: DefaultTheme = {
  background: '#181A1B',
  card: '#23272F',
  text: '#F7F9FC',
  subtext: '#B0B8C1',
  accent: YELLOW,
  accent2: YELLOW,
  tagBg: '#23272F',
  tagText: '#F7F9FC',
  searchBg: 'rgba(30,32,34,0.7)',
  glass: 'rgba(30,32,34,0.6)',
  heroLeft: '#181A1B',
  heroRight: YELLOW,
  heroAmber: YELLOW,
};

// Global styles for the app
const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    transition: background 0.3s, color 0.3s;
    overflow-x: hidden;
  }
`;

// --- Hero Section ---
// The dramatic split hero section with plate image and pattern
const HeroSection = styled.section`
  display: flex;
  min-height: 100vh;
  width: 100vw;
  position: relative;
  overflow: hidden;
  @media (max-width: 900px) {
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
  }
`;

const HeroLeft = styled.div`
  flex: 0 0 55%;
  background: ${({ theme }) => theme.heroLeft};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 5vw 0 7vw;
  z-index: 2;
  @media (max-width: 900px) {
    flex: 1;
    align-items: center;
    padding: 40px 5vw 24px 5vw;
    text-align: center;
  }
`;

const HeroRight = styled.div`
  flex: 0 0 45%;
  background: ${({ theme }) => theme.heroRight};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  overflow: visible;
  min-width: 0;
  @media (max-width: 900px) {
    width: 100vw;
    min-height: 220px;
    padding-bottom: 32px;
    justify-content: center;
  }
`;

const Pattern = styled.div`
  position: absolute;
  left: calc(55% - 320px);
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 600px;
  height: 600px;
  pointer-events: none;
  opacity: 0.35;
  background-image: radial-gradient(circle, #000 3px, transparent 3px);
  background-size: 22px 22px;
  @media (max-width: 1200px) {
    width: 320px;
    height: 320px;
    left: calc(55% - 180px);
  }
  @media (max-width: 900px) {
    width: 180px;
    height: 180px;
    left: 50%;
    display: none;
  }
`;

const headlineFadeIn = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.2rem;
  line-height: 1.08;
  letter-spacing: 0.5px;
  opacity: 0;
  animation: ${headlineFadeIn} 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s both;
  span {
    color: ${({ theme }) => theme.accent};
    background: linear-gradient(90deg, ${YELLOW} 0%, ${YELLOW} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
  @media (max-width: 600px) {
    font-size: 1.7rem;
  }
`;

const separatorGrow = keyframes`
  from { width: 0; opacity: 0; }
  to { width: 120px; opacity: 1; }
`;

const taglineFadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HeroSeparator = styled.div`
  height: 2px;
  width: 680px;
  background: ${({ theme }) => theme.accent};
  border-radius: 1px;
  margin: 1.2rem 0 1.2rem 0;
  animation: ${separatorGrow} 0.7s cubic-bezier(0.4,0,0.2,1) 0.5s both;
  @media (max-width: 600px) {
    width: 220px;
    height: 2px;
    margin: 0.7rem 0 0.7rem 0;
  }
`;

const HeroTagline = styled.p`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${({ theme }) => theme.accent2};
  margin-bottom: 2.2rem;
  letter-spacing: 2px;
  opacity: 0;
  animation: ${taglineFadeIn} 0.7s cubic-bezier(0.4,0,0.2,1) 0.8s both;
  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 1.2rem;
  }
`;

const HeroSearchRow = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 540px;
  background: none;
  border-radius: 16px;
  box-shadow: none;
  overflow: hidden;
  margin-bottom: 2.5rem;
  border: 1.5px solid ${({ theme }) => theme.accent};
  position: relative;
`;

const HeroSearchIcon = styled.span`
  position: absolute;
  left: 18px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.accent};
  font-size: 1.2rem;
  pointer-events: none;
  display: flex;
  align-items: center;
`;

const HeroSearchInput = styled.input`
  width: 100%;
  padding: 16px 14px 16px 44px;
  border: none;
  font-size: 1.1rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
  outline: none;
  &::placeholder {
    color: #b0b8c1;
    opacity: 1;
    font-style: italic;
  }
`;

const HeroSearchButton = styled.button`
  background: ${({ theme }) => theme.accent};
  color: #fff;
  font-weight: 700;
  font-size: 1.1rem;
  border: none;
  padding: 0 32px;
  height: 100%;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  border-radius: 0;
  letter-spacing: 1px;
  &:hover {
    background: #fff3b0;
    color: ${({ theme }) => theme.text};
  }
`;

const HeroImageCircle = styled.div`
  width: 600px;
  height: 600px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 8px 48px #FFB30044;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: calc(55% - 380px);
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  @media (max-width: 1200px) {
    width: 320px;
    height: 320px;
    left: calc(55% - 240px);
  }
  @media (max-width: 900px) {
    width: 180px;
    height: 180px;
    left: 50%;
    position: static;
    transform: none;
    margin: 0 auto;
  }
`;

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const HeroImageCrop = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 30s linear infinite;
`;

const HeroImage = styled.img`
  width: calc(100% + 16px);
  height: calc(100% + 16px);
  position: absolute;
  left: -8px;
  top: -8px;
  object-fit: contain;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

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

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const CardContent = styled.div`
  padding: 20px 18px 18px 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.5rem;
`;

const CardDesc = styled.p`
  color: ${({ theme }) => theme.subtext};
  font-size: 1rem;
  margin-bottom: 1.2rem;
  flex: 1;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const CardTag = styled.span`
  background: ${({ theme }) => theme.accent2};
  color: #fff;
  font-size: 0.85rem;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;
`;

const TagButton = styled.button<{
  selected: boolean;
}>`
  background: none;
  border: none;
  cursor: pointer;
  outline: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s, border 0.18s;
  &:hover .tag-img {
    transform: scale(1.08);
    box-shadow: 0 4px 18px ${({ theme }) => theme.accent}33;
    border: 3px solid ${({ theme }) => theme.accent};
  }
`;

const TagSectionTitle = styled.div`
  text-align: center;
  margin-bottom: 40px;
  color: ${({ theme }) => theme.accent2};
  font-weight: 900;
  font-size: 2.4rem;
  letter-spacing: 1.5px;
  text-shadow: 0 2px 16px ${({ theme }) => theme.accent}22;
  @media (max-width: 600px) {
    font-size: 1.4rem;
    margin-bottom: 24px;
  }
`;

const TagRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 56px;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 48px;
  @media (max-width: 900px) {
    gap: 32px;
    margin-bottom: 32px;
  }
`;

const TagImg = styled.div<{selected: boolean}>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid ${({ selected, theme }) => selected ? theme.accent : 'transparent'};
  box-shadow:
    0 2px 18px #0004,
    0 0 0 8px ${({ selected, theme }) => selected ? theme.accent + '44' : theme.accent + '22'};
  transition: border 0.18s, box-shadow 0.18s, transform 0.18s;
  margin-bottom: 12px;
  background: #181A1B;
  &.tag-img {
    /* for hover targeting */
  }
  @media (max-width: 600px) {
    width: 70px;
    height: 70px;
    margin-bottom: 6px;
  }
`;

const FooterSection = styled.footer`
  background: ${({ theme }) => theme.accent};
  color: #181A1B;
  padding: 56px 0 40px 0;
  text-align: center;
  margin-top: 64px;
  box-shadow: 0 -2px 32px #0002;
`;

const FooterTitle = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  letter-spacing: 2px;
  margin-bottom: 12px;
  @media (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const FooterQuote = styled.div`
  font-size: 1.15rem;
  font-style: italic;
  font-weight: 400;
  margin-bottom: 28px;
  color: #23272F;
  opacity: 0.85;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 32px;
  margin-top: 12px;
`;

const SocialIcon = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #181A1B;
  color: ${({ theme }) => theme.accent};
  font-size: 2rem;
  transition: background 0.18s, color 0.18s, transform 0.18s;
  &:hover {
    background: #fff;
    color: #181A1B;
    transform: scale(1.13) rotate(-8deg);
    box-shadow: 0 2px 12px #0002;
  }
`;

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const gridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const filteredRecipes = recipes.filter(recipe => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      recipe.name.toLowerCase().includes(query) ||
      recipe.description.toLowerCase().includes(query) ||
      recipe.tags.some(tag => tag.toLowerCase().includes(query));
    const matchesTags = selectedTags.length === 0 ||
      selectedTags.every(tag => recipe.tags.includes(tag));
    return matchesSearch && matchesTags;
  });

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleRecipeClick = (recipeId: number) => {
    navigate(`/recipe/${recipeId}`);
  };

  return (
    <>
      <HeroSection>
        <HeroLeft>
          <HeroTitle>
            Discover<br />
            <span>Delicious Recipes</span>
          </HeroTitle>
          <HeroSeparator />
          <HeroTagline>Anyone Can Cook!</HeroTagline>
          <HeroSearchRow onSubmit={handleSearchSubmit}>
            <HeroSearchIcon>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="2"/>
                <line x1="13.0607" y1="13.3536" x2="16" y2="16.2929" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </HeroSearchIcon>
            <HeroSearchInput
              type="text"
              placeholder="what's cookin', good lookin'"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <HeroSearchButton type="submit">GO</HeroSearchButton>
          </HeroSearchRow>
        </HeroLeft>
        <HeroRight>
          <Pattern />
          <HeroImageCircle>
            <HeroImageCrop>
              <HeroImage src={heroPlate} alt="Plate of food" />
            </HeroImageCrop>
          </HeroImageCircle>
        </HeroRight>
      </HeroSection>
      <Container>
        <div style={{ marginTop: 32 }} />
        <TagSectionTitle>Browse by Tag</TagSectionTitle>
        <TagRow>
          {tags.map(tag => (
            <TagButton
              key={tag.label}
              selected={selectedTags.includes(tag.label)}
              onClick={() => toggleTag(tag.label)}
              aria-label={tag.label}
            >
              <TagImg className="tag-img" selected={selectedTags.includes(tag.label)}>
                <img src={tag.image} alt={tag.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </TagImg>
              <span style={{
                marginTop: 4,
                fontSize: '1.15rem',
                fontWeight: 900,
                color: selectedTags.includes(tag.label) ? darkAmberTheme.accent : darkAmberTheme.text,
                letterSpacing: 0.5,
                textShadow: selectedTags.includes(tag.label) ? `${darkAmberTheme.accent}44 0 2px 8px` : 'none',
              }}>{tag.label}</span>
            </TagButton>
          ))}
        </TagRow>
        <div style={{ marginBottom: 32 }} />
        <Grid ref={gridRef}>
          {filteredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={handleRecipeClick}
            />
          ))}
          {filteredRecipes.length % 3 !== 0 &&
            Array.from({ length: 3 - (filteredRecipes.length % 3) }).map((_, i) => (
              <div key={`empty-cell-${i}`} style={{ visibility: 'hidden' }} />
            ))}
        </Grid>
      </Container>
      <FooterSection>
        <FooterTitle>LettuceCook</FooterTitle>
        <FooterQuote>Thank you for visiting! "Good food is the foundation of genuine happiness."</FooterQuote>
        <SocialLinks>
          <SocialIcon href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.686-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.593 1.028 2.686 0 3.847-2.337 4.695-4.566 4.944.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.749 0 .267.18.579.688.481C19.138 20.203 22 16.447 22 12.021 22 6.484 17.523 2 12 2z"/></svg>
          </SocialIcon>
          <SocialIcon href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 5.924c-.793.352-1.645.59-2.54.697a4.48 4.48 0 0 0 1.963-2.475 8.94 8.94 0 0 1-2.828 1.082A4.48 4.48 0 0 0 16.11 4c-2.482 0-4.495 2.013-4.495 4.495 0 .352.04.695.116 1.022C7.728 9.37 4.1 7.575 1.67 4.95c-.386.664-.607 1.437-.607 2.262 0 1.56.794 2.936 2.003 3.744-.737-.023-1.43-.226-2.037-.563v.057c0 2.18 1.55 4.002 3.604 4.418-.377.103-.775.158-1.186.158-.29 0-.57-.028-.844-.08.57 1.78 2.223 3.078 4.183 3.113A8.98 8.98 0 0 1 2 19.54a12.68 12.68 0 0 0 6.88 2.017c8.253 0 12.774-6.835 12.774-12.774 0-.195-.004-.39-.013-.583A9.14 9.14 0 0 0 24 4.59a8.94 8.94 0 0 1-2.54.697z"/></svg>
          </SocialIcon>
          <SocialIcon href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.242 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.242 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.242-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.131 4.602.425 3.635 1.392 2.668 2.36 2.374 3.533 2.315 4.81.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.059 1.277.353 2.45 1.32 3.417.967.967 2.14 1.261 3.417 1.32C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.059 2.45-.353 3.417-1.32.967-.967 1.261-2.14 1.32-3.417.059-1.28.072-1.689.072-4.948s-.013-3.668-.072-4.948c-.059-1.277-.353-2.45-1.32-3.417-.967-.967-2.14-1.261-3.417-1.32C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
          </SocialIcon>
          <SocialIcon href="https://pinterest.com/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04c-5.523 0-10 4.477-10 10 0 4.418 2.865 8.184 6.839 9.504-.094-.807-.179-2.048.037-2.93.195-.8 1.252-5.104 1.252-5.104s-.319-.64-.319-1.584c0-1.484.861-2.592 1.934-2.592.912 0 1.353.684 1.353 1.504 0 .916-.584 2.288-.885 3.563-.252 1.064.535 1.93 1.584 1.93 1.9 0 3.184-2.004 3.184-4.892 0-2.56-1.84-4.352-4.47-4.352-3.048 0-4.84 2.288-4.84 4.655 0 .924.355 1.916.8 2.454.09.11.104.206.076.316-.083.34-.27 1.064-.307 1.212-.05.2-.162.242-.375.146-1.4-.57-2.272-2.36-2.272-3.8 0-3.092 2.244-5.936 6.47-5.936 3.396 0 6.032 2.42 6.032 5.655 0 3.372-2.104 6.08-5.024 6.08-1.008 0-1.957-.524-2.28-1.12l-.62 2.36c-.18.684-.668 1.54-.996 2.063.75.23 1.54.355 2.364.355 5.523 0 10-4.477 10-10.001 0-5.523-4.477-10-10-10z"/></svg>
          </SocialIcon>
          <SocialIcon href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M12.75 2.25h2.25v2.25h-2.25V2.25zm6.75 3.75v2.25c-1.5 0-2.25-1.5-2.25-2.25h-2.25v9c0 1.242-1.008 2.25-2.25 2.25s-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25c.186 0 .366.027.537.075V9.75a4.5 4.5 0 1 0 3.213 7.425A4.5 4.5 0 0 0 19.5 6z"/></svg>
          </SocialIcon>
          <SocialIcon href="https://facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.408.595 24 1.326 24h11.495v-9.294H9.691v-3.622h3.13V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.408 24 22.674V1.326C24 .592 23.406 0 22.675 0z"/></svg>
          </SocialIcon>
          <SocialIcon href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M17.53 2H21.5l-7.19 8.21L23 22h-7.18l-5.61-7.5-6.5 7.5H2.47l7.56-8.97L1 2h7.37l5.19 6.94L17.53 2zm-2.1 17.3h2.01l-5.44-7.36-2.01 2.32L15.43 19.3zm-9.14 0h2.36l1.54-1.78-1.54-2.13-2.36 3.91zm3.19-3.68l1.54 2.13 1.54-1.78-1.54-2.13-1.54 1.78zm7.72-9.62l-1.32 1.52 2.36 3.19 1.32-1.52-2.36-3.19zm-2.36 2.72l-1.54-2.13-1.54 1.78 1.54 2.13 1.54-1.78zm-7.72-2.72l2.36 3.19 1.32-1.52-2.36-3.19-1.32 1.52zm13.13 13.3l-2.36-3.19-1.32 1.52 2.36 3.19 1.32-1.52zm-3.19-3.68l-1.54-2.13-1.54 1.78 1.54 2.13 1.54-1.78z"/></svg>
          </SocialIcon>
          <SocialIcon href="https://youtube.com/" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <svg width="32" height="32" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a2.994 2.994 0 0 0-2.112-2.112C19.454 3.5 12 3.5 12 3.5s-7.454 0-9.386.574A2.994 2.994 0 0 0 .502 6.186C0 8.12 0 12 0 12s0 3.88.502 5.814a2.994 2.994 0 0 0 2.112 2.112C4.546 20.5 12 20.5 12 20.5s7.454 0 9.386-.574a2.994 2.994 0 0 0 2.112-2.112C24 15.88 24 12 24 12s0-3.88-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
          </SocialIcon>
        </SocialLinks>
      </FooterSection>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkAmberTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
