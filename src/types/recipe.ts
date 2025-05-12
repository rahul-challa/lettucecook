/**
 * Represents a recipe in the application
 */
export interface Recipe {
  /** Unique identifier for the recipe */
  id: number;
  /** Name of the recipe */
  name: string;
  /** Detailed description of the recipe */
  description: string;
  /** Array of tags associated with the recipe */
  tags: string[];
  /** URL or path to the recipe's main image */
  image: string;
  /** Optional array of ingredients with quantities */
  ingredients?: Ingredient[];
  /** Optional array of cooking instructions */
  instructions?: string[];
  /** Optional cooking time in minutes */
  cookingTime?: number;
  /** Optional number of servings */
  servings?: number;
  /** Optional additional notes and tips */
  notes?: string[];
}

/**
 * Represents an ingredient with its quantity
 */
export interface Ingredient {
  /** Name of the ingredient */
  name: string;
  /** Quantity of the ingredient */
  quantity: string;
  /** Optional unit of measurement */
  unit?: string;
}

/**
 * Represents a tag with its associated image
 */
export interface Tag {
  /** Label of the tag */
  label: string;
  /** URL or path to the tag's image */
  image: string;
} 