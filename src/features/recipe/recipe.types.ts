import { Tables } from "../../clients/supabase";

export type RecipeInputs = {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  category?: string;
  image_url?: string;
  recipe_yield: string;
  total_time?: string;
};

export type Recipe = Tables<"recipe">;
