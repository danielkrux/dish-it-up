import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRecipe } from "../recipe.service";
import { useNavigation } from "expo-router";

function useCreateRecipe() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const createRecipeMutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigation.getParent()?.goBack();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return createRecipeMutation;
}

export default useCreateRecipe;
