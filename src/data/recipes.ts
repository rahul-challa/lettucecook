import { Recipe, Tag } from '../types/recipe';
import placeholderImg from '../assets/placeholder.png';
import veganImg from '../assets/vegan.png';
import vegetarianImg from '../assets/vegetarian.png';
import glutenfreeImg from '../assets/glutenfree.png';
import halalImg from '../assets/halal.png';
import dairyfreeImg from '../assets/dairyfree.png';

/**
 * Collection of available recipe tags
 */
export const tags: Tag[] = [
  {
    label: 'Vegan',
    image: veganImg,
  },
  {
    label: 'Vegetarian',
    image: vegetarianImg,
  },
  {
    label: 'Gluten-Free',
    image: glutenfreeImg,
  },
  {
    label: 'Halal',
    image: halalImg,
  },
  {
    label: 'Dairy-Free',
    image: dairyfreeImg,
  },
];

/**
 * Collection of recipes
 * Add new recipes by following the Recipe interface structure
 */
export const recipes: Recipe[] = [
  {
    id: 1,
    name: 'Quinoa Buddha Bowl',
    description: 'A nutritious bowl packed with protein-rich quinoa, fresh vegetables, and a delicious tahini dressing.',
    tags: ['Vegan', 'Gluten-Free'],
    image: placeholderImg,
    ingredients: [
      { name: 'Quinoa', quantity: '1', unit: 'cup' },
      { name: 'Mixed vegetables', quantity: '2', unit: 'cups' },
      { name: 'Tahini', quantity: '2', unit: 'tbsp' },
      { name: 'Lemon juice', quantity: '1', unit: 'tbsp' },
      { name: 'Olive oil', quantity: '2', unit: 'tbsp' },
    ],
    instructions: [
      'Cook quinoa according to package instructions',
      'Steam or roast vegetables until tender',
      'Whisk together tahini, lemon juice, and olive oil for dressing',
      'Combine quinoa and vegetables in a bowl',
      'Drizzle with dressing and serve',
    ],
    cookingTime: 30,
    servings: 2,
    notes: [
      'Rinse quinoa thoroughly before cooking to remove any bitter taste',
      'You can prepare the dressing ahead of time and store it in the fridge for up to 3 days',
      'Feel free to add protein of your choice like tofu, chickpeas, or tempeh',
      'For extra flavor, try adding fresh herbs like cilantro or parsley',
    ],
  },
  {
    id: 2,
    name: 'Avocado Toast',
    description: 'Creamy avocado spread on toasted artisan bread, topped with microgreens and a sprinkle of everything bagel seasoning.',
    tags: ['Vegetarian', 'Vegan'],
    image: placeholderImg,
    ingredients: [
      { name: 'Artisan bread', quantity: '2', unit: 'slices' },
      { name: 'Avocado', quantity: '1', unit: 'whole' },
      { name: 'Microgreens', quantity: '1/4', unit: 'cup' },
      { name: 'Everything bagel seasoning', quantity: '1', unit: 'tbsp' },
    ],
    instructions: [
      'Toast bread until golden and crispy',
      'Mash avocado with a fork',
      'Spread mashed avocado on toast',
      'Top with microgreens and seasoning',
    ],
    cookingTime: 10,
    servings: 1,
    notes: [
      'For extra creaminess, add a squeeze of lemon juice to the avocado',
      'If you don\'t have everything bagel seasoning, you can use a mix of sesame seeds, poppy seeds, and salt',
      'Try adding a pinch of red pepper flakes for a spicy kick',
      'For a heartier meal, add a poached egg on top',
    ],
  },
  // Add more recipes here following the same structure
]; 