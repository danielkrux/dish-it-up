import { createClient } from "@supabase/supabase-js";
import { groupBy } from "lodash";

const sb = createClient("", "");

async function addOrderToIngredients() {
  const ingredients = await sb.from("ingredients").select("*");
  const ingredientsGroupedByRecipe = groupBy(ingredients.data, "recipe_id");

  const orderedIngredients = Object.entries(ingredientsGroupedByRecipe).map(
    ([_, recipeIngredients]) => {
      return recipeIngredients.map((ingredient, index) => ({
        ...ingredient,
        order: index + 1,
      }));
    }
  );

  orderedIngredients;

  const { error } = await sb
    .from("ingredients")
    .upsert(orderedIngredients.flat());

  console.log(error);
}

addOrderToIngredients();
