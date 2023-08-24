import { Tables } from "../../clients/supabase";

export type RecipeInputs = {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  category?: string;
  image_url?: string;
  recipe_yield: number;
};

export type Recipe = Tables<"recipes">;
