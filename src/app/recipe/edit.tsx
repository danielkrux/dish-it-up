import { Stack, useLocalSearchParams } from "expo-router";
import EditRecipeComponent from "../../features/recipe/components/EditRecipe";

export default function EditRecipe() {
  const { url } = useLocalSearchParams();
  return (
    <>
      <Stack.Screen options={{ title: "Edit recipe" }} />
      {typeof url === "string" && <EditRecipeComponent url={url} />}
    </>
  );
}
