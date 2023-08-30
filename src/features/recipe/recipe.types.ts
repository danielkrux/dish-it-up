import { Tables } from "../../clients/supabase";

export type Category = Tables<"category">;

export type RecipeInputs = {
  id?: string;
  name: string;
  description: string;
  image_url?: string;
  ingredients: string[];
  instructions: string[];
  categories: Category[];
  recipe_yield: string;
  total_time: string;
};

export type RecipeUpdate = RecipeInputs & {
  id: string;
  categories: Category[];
};

export type Recipe = Tables<"recipe">;
