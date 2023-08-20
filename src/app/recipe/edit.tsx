import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import EditRecipeComponent from "../../features/recipe/components/EditRecipe";
import { parseRecipe } from "../../features/recipe/recipe.service";
import { isValidUrl } from "../../utils/url";
import { Recipe } from "../../../types/Recipe";

export default function EditRecipe() {
  const [recipe, setRecipe] = useState<Recipe | null>();
  const { url } = useLocalSearchParams();

  useQuery(["parse-recipe", url], () => parseRecipe(url as string), {
    enabled: isValidUrl(url as string),
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
