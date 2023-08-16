import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import EditRecipeComponent from "../../features/recipe/components/EditRecipe";
import { parseRecipe } from "../../services/recipe.service";
import { isValidUrl } from "../utils/url";
import { Recipe } from "../../../types/Recipe";

export default function EditRecipe() {
  const [recipe, setRecipe] = useState<Recipe | null>();
  const { url } = useLocalSearchParams();

  useQuery(["parse-recipe", url], () => parseRecipe(url), {
    enabled: isValidUrl(url),
    onSuccess: (data) => {
      if (!data) return;
      setRecipe(data);
    },
  });

  return (
    <>
      <Stack.Screen options={{ title: "Edit recipe" }} />
      {recipe && <EditRecipeComponent recipe={recipe} />}
    </>
  );
}
