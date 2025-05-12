import React from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { Recipe } from '../types/recipe';
import { recipes } from '../data/recipes';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, Table, TableRow, TableCell, WidthType } from 'docx';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 24px;
  @media (max-width: 600px) {
    padding: 32px 16px;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.accent};
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  padding: 8px 16px;
  border-radius: 12px;
  transition: background 0.2s, transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s cubic-bezier(0.4,0,0.2,1);
  &:hover {
    background: ${({ theme }) => theme.accent}22;
    transform: scale(1.06);
    box-shadow: 0 2px 12px ${({ theme }) => theme.accent}33;
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    margin-bottom: 24px;
  }
`;

const RecipeHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  margin-bottom: 48px;
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  @media (max-width: 600px) {
    gap: 24px;
    margin-bottom: 32px;
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  opacity: 0;
  animation: fadeInImg 0.7s cubic-bezier(0.4,0,0.2,1) 0.1s forwards;
  @keyframes fadeInImg {
    to { opacity: 1; }
  }
  @media (max-width: 900px) {
    height: 300px;
  }
  @media (max-width: 600px) {
    height: 240px;
    border-radius: 16px;
  }
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      transform: scale(1.025);
      box-shadow: 0 12px 40px ${({ theme }) => theme.accent}22, 0 8px 32px rgba(0,0,0,0.18);
      transition: transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s cubic-bezier(0.4,0,0.2,1);
    }
  }
`;

const RecipeInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const RecipeTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin-bottom: 16px;
  line-height: 1.2;
  @media (max-width: 900px) {
    font-size: 2.4rem;
  }
  @media (max-width: 600px) {
    font-size: 1.8rem;
    margin-bottom: 12px;
  }
`;

const RecipeDescription = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.subtext};
  margin-bottom: 24px;
  line-height: 1.6;
  @media (max-width: 600px) {
    font-size: 1.1rem;
    margin-bottom: 20px;
  }
`;

const RecipeMeta = styled.div`
  display: flex;
  gap: 24px;
  margin-bottom: 32px;
  @media (max-width: 600px) {
    gap: 16px;
    margin-bottom: 24px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.subtext};
  font-size: 1.1rem;
  @media (max-width: 600px) {
    font-size: 1rem;
  }
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 32px;
  @media (max-width: 600px) {
    gap: 8px;
    margin-bottom: 24px;
  }
`;

const Tag = styled.span`
  background: ${({ theme }) => theme.accent};
  color: #181A1B;
  font-size: 1rem;
  padding: 8px 16px;
  border-radius: 12px;
  font-weight: 600;
  transition: transform 0.18s cubic-bezier(0.4,0,0.2,1), box-shadow 0.18s cubic-bezier(0.4,0,0.2,1);
  @media (max-width: 600px) {
    font-size: 0.9rem;
    padding: 6px 12px;
  }
  &:hover {
    transform: scale(1.08);
    box-shadow: 0 2px 12px ${({ theme }) => theme.accent}55;
    z-index: 1;
  }
`;

const RecipeContent = styled.div`
  background: ${({ theme }) => theme.card};
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
  @media (max-width: 600px) {
    border-radius: 16px;
    padding: 24px 16px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  &::after {
    content: '';
    flex: 1;
    height: 2px;
    background: ${({ theme }) => theme.accent};
    opacity: 0.3;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
`;

const IngredientList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  @media (max-width: 600px) {
    margin-bottom: 24px;
  }
`;

const IngredientItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  margin-bottom: 8px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    background: ${({ theme }) => theme.accent}18;
    box-shadow: 0 2px 8px ${({ theme }) => theme.accent}22;
    transform: scale(1.02);
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 10px 14px;
  }
`;

const IngredientQuantity = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.accent};
  margin-right: 8px;
  min-width: 80px;
  @media (max-width: 600px) {
    min-width: 70px;
  }
`;

const InstructionList = styled.ol`
  list-style-position: inside;
  padding: 0;
  margin: 0;
`;

const InstructionItem = styled.li`
  padding: 16px;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  margin-bottom: 12px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  transition: background 0.18s, box-shadow 0.18s, transform 0.18s;
  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    background: ${({ theme }) => theme.accent}18;
    box-shadow: 0 2px 8px ${({ theme }) => theme.accent}22;
    transform: scale(1.015);
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 14px;
    margin-bottom: 10px;
  }
`;

const NotesSection = styled.div`
  margin-top: 32px;
  padding-top: 32px;
  border-top: 2px solid ${({ theme }) => theme.accent}22;
  @media (max-width: 600px) {
    margin-top: 24px;
    padding-top: 24px;
  }
`;

const NotesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const NoteItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.background};
  border-radius: 12px;
  margin-bottom: 12px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.6;
  transition: box-shadow 0.18s, transform 0.18s, background 0.18s;
  &:last-child {
    margin-bottom: 0;
  }
  &::before {
    content: '💡';
    font-size: 1.2rem;
  }
  &:hover {
    box-shadow: 0 2px 12px ${({ theme }) => theme.accent}33;
    background: ${({ theme }) => theme.accent}10;
    transform: scale(1.02);
  }
  @media (max-width: 600px) {
    font-size: 1rem;
    padding: 14px;
    margin-bottom: 10px;
    gap: 10px;
  }
`;

const DownloadButton = styled.button`
  background: ${({ theme }) => theme.accent};
  color: #181A1B;
  font-weight: 700;
  font-size: 1.08rem;
  border: none;
  border-radius: 12px;
  padding: 10px 22px;
  margin-left: 16px;
  cursor: pointer;
  box-shadow: 0 2px 12px ${({ theme }) => theme.accent}22;
  transition: background 0.18s, color 0.18s, transform 0.18s, box-shadow 0.18s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background: #fffbe6;
    color: ${({ theme }) => theme.accent};
    transform: scale(1.05);
    box-shadow: 0 4px 18px ${({ theme }) => theme.accent}44;
  }
`;

const DownloadButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 18px;
  margin-bottom: 8px;
`;

function recipeToDocx(recipe: Recipe) {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: recipe.name,
            heading: HeadingLevel.TITLE,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: recipe.description,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: `Tags: ${recipe.tags.join(', ')}`,
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: recipe.cookingTime ? `Cooking Time: ${recipe.cookingTime} mins` : '',
            spacing: { after: 100 },
          }),
          new Paragraph({
            text: recipe.servings ? `Servings: ${recipe.servings}` : '',
            spacing: { after: 200 },
          }),
          new Paragraph({
            text: 'Ingredients',
            heading: HeadingLevel.HEADING_2,
            spacing: { after: 100 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: (recipe.ingredients || []).map(ing =>
              new TableRow({
                children: [
                  new TableCell({
                    width: { size: 40, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ text: `${ing.quantity} ${ing.unit || ''}`.trim() })],
                  }),
                  new TableCell({
                    width: { size: 60, type: WidthType.PERCENTAGE },
                    children: [new Paragraph({ text: ing.name })],
                  }),
                ],
              })
            ),
          }),
          new Paragraph({
            text: 'Instructions',
            heading: HeadingLevel.HEADING_2,
            spacing: { before: 300, after: 100 },
          }),
          ...((recipe.instructions || []).map((step, i) =>
            new Paragraph({
              text: `${i + 1}. ${step}`,
              spacing: { after: 80 },
            })
          )),
          recipe.notes && recipe.notes.length > 0
            ? new Paragraph({
                text: 'Notes & Tips',
                heading: HeadingLevel.HEADING_2,
                spacing: { before: 300, after: 100 },
              })
            : undefined,
          ...(recipe.notes || []).map(note =>
            new Paragraph({
              text: `• ${note}`,
              spacing: { after: 60 },
            })
          ),
        ].filter((c): c is Paragraph | Table => c !== undefined),
      },
    ],
  });
  return doc;
}

const RecipeDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const recipe = recipes.find((r: Recipe) => r.id === Number(id));

  const handleDownload = async () => {
    if (!recipe) return;
    const doc = recipeToDocx(recipe);
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${recipe.name.replace(/[^a-z0-9]/gi, '_')}.docx`);
  };

  if (!recipe) {
    return (
      <Container>
        <BackButton onClick={() => navigate('/')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to Recipes
        </BackButton>
        <h1>Recipe not found</h1>
      </Container>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Recipes
      </BackButton>

      <RecipeHeader>
        <RecipeImage src={recipe.image} alt={recipe.name} />
        <RecipeInfo>
          <RecipeTitle>{recipe.name}</RecipeTitle>
          <RecipeDescription>{recipe.description}</RecipeDescription>
          <RecipeMeta>
            {recipe.cookingTime && (
              <MetaItem>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="M12 6v6l4 2"/>
                </svg>
                {recipe.cookingTime} mins
              </MetaItem>
            )}
            {recipe.servings && (
              <MetaItem>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
                {recipe.servings} servings
              </MetaItem>
            )}
          </RecipeMeta>
          <TagsContainer>
            {recipe.tags.map((tag: string) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagsContainer>
          <DownloadButtonWrapper>
            <DownloadButton onClick={handleDownload} title="Download as DOCX">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12l7 7 7-7"/><rect x="5" y="19" width="14" height="2" rx="1"/></svg>
              Download Recipe
            </DownloadButton>
          </DownloadButtonWrapper>
        </RecipeInfo>
      </RecipeHeader>

      <RecipeContent>
        <SectionTitle>Ingredients</SectionTitle>
        <IngredientList>
          {recipe.ingredients?.map((ingredient, index) => (
            <IngredientItem key={index}>
              <IngredientQuantity>
                {ingredient.quantity} {ingredient.unit}
              </IngredientQuantity>
              {ingredient.name}
            </IngredientItem>
          ))}
        </IngredientList>

        <SectionTitle>Instructions</SectionTitle>
        <InstructionList>
          {recipe.instructions?.map((instruction, index) => (
            <InstructionItem key={index}>{instruction}</InstructionItem>
          ))}
        </InstructionList>

        {recipe.notes && recipe.notes.length > 0 && (
          <NotesSection>
            <SectionTitle>Notes & Tips</SectionTitle>
            <NotesList>
              {recipe.notes.map((note, index) => (
                <NoteItem key={index}>{note}</NoteItem>
              ))}
            </NotesList>
          </NotesSection>
        )}
      </RecipeContent>
    </Container>
  );
};

export default RecipeDetail; 