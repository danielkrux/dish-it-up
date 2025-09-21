import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import Text from "~/components/Text";
import { useCookModeContext } from "~/features/cook-mode/CookModeContext";
import SearchAndFilter from "~/features/home/components/SearchAndFilter";

import RecipeSelectList from "~/features/meal-planner/components/RecipeSelectList";

import type { Recipe } from "~/features/recipe/recipe.types";

function SelectRecipe() {
  const { setRecipeSelectionIds } = useCookModeContext();
  const params = useLocalSearchParams<{ ids: string | string[] }>();
  const [selectedRecipes, setSelectedRecipes] = useState<number[]>([]);

  function handleRecipeSelect(recipe: Recipe) {
    setSelectedRecipes((prev) => {
      if (prev.includes(recipe.id)) {
        return prev.filter((r) => r !== recipe.id);
      }
      return [...prev, recipe.id];
    });
  }

  function handleSaveSelection() {
    const idsFromParams = Array.isArray(params.ids)
      ? params.ids.map(Number)
      : [Number(params.ids)];
    setRecipeSelectionIds([...idsFromParams, ...selectedRecipes]);
    router.back();
  }

  return (
    <RecipeSelectList
      onSave={handleSaveSelection}
      selectedRecipes={selectedRecipes}
      onRecipeSelect={handleRecipeSelect}
      headerComponent={() => (
        <>
          <Text className="mb-2 mt-2 text-3xl" type="header">
            Select Recipes
          </Text>
          <SearchAndFilter />
        </>
      )}
    />
  );
}

export default SelectRecipe;
