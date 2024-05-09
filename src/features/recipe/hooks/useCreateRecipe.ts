import { useMutation, useQueryClient } from "@tanstack/react-query";
import recipeKeys from "../recipe.queryKeys";
import { createRecipe } from "../recipe.service";
import { Recipe } from "../recipe.types";
import { router } from "expo-router";

function useCreateRecipe() {
  const queryClient = useQueryClient();

  const mutation = useMutation(createRecipe, {
    onMutate: async (recipe) => {
      await queryClient.cancelQueries(recipeKeys.all);
      const previousRecipes = queryClient.getQueryData<Recipe[]>(
        recipeKeys.all
      );

      queryClient.setQueryData(recipeKeys.all, () => [
        ...(previousRecipes ?? []),
        recipe,
      ]);
      router.navigate("/");
      return { previousRecipes };
    },
    onError: (err, variables, context) => {
      queryClient.setQueryData(recipeKeys.all, context?.previousRecipes);
    },
    onSettled: () => {
      queryClient.invalidateQueries(recipeKeys.all);
    },
  });

  return mutation;
}

export default useCreateRecipe;
