import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Image as ExpoImage } from "expo-image";
import { ScrollView, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";

import { saveRecipe } from "../recipe.service";
import Button from "../../../components/Button";
import theme from "../../../theme";
import useSafeAreaInsets from "../../../hooks/useSafeAreaInsets";
import TextInput from "../../../components/Input";
import Text from "../../../components/Text";
import { Recipe } from "../../../../types/Recipe";

export default function EditRecipe({ recipe }: { recipe?: Recipe }) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const insets = useSafeAreaInsets();

  const saveRecipeMutation = useMutation({
    mutationFn: saveRecipe,
    onSuccess: () => {
      router.back();
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleTextChange = (text: string, field: keyof Recipe) => {
    // @ts-ignore
    setRecipe((prev) => ({ ...prev, [field]: text }));
  };

  if (!recipe) return null;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        {recipe && (
          <View style={styles.recipe}>
            <TextInput
              defaultValue={recipe?.name ?? ""}
              onChangeText={(t) => handleTextChange(t, "name")}
            />
            <ExpoImage
              style={styles.image}
              source={{ uri: recipe?.image_url ?? "" }}
            />
            <View>
              <TextInput
                numberOfLines={4}
                defaultValue={recipe?.description ?? ""}
                onChangeText={(t) => handleTextChange(t, "description")}
                multiline
              />
              <View style={styles.ingredients}>
                <Text style={styles.ingredientsHeader}>Ingredients</Text>
                {recipe?.ingredients?.map((ingredient, index) => (
                  <View style={styles.ingredient}>
                    <Text style={styles.ingredientCount}>{index + 1}.</Text>
                    <TextInput
                      style={styles.ingredientInput}
                      defaultValue={ingredient}
                    />
                  </View>
                ))}
                <Button icon="plus">Add</Button>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
      <Button
        style={[styles.fixedButton, { bottom: insets.bottom }]}
        size="large"
        onPress={() => saveRecipeMutation.mutate(recipe)}
      >
        Save
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.s,
  },
  importButton: {
    marginTop: theme.spacing.xs,
    marginBottom: theme.spacing.s,
  },
  contentContainer: {
    paddingBottom: 140,
  },
  recipe: {
    gap: theme.spacing.s,
  },
  image: {
    height: 150,
    flex: 1,
    borderRadius: 10,
  },
  ingredientsHeader: {
    marginTop: theme.spacing.s,
    marginBottom: theme.spacing.xs,
  },
  ingredients: {
    gap: theme.spacing.xs,
  },
  ingredient: {
    flexDirection: "row",
    gap: theme.spacing.xs,
    alignItems: "center",
  },
  ingredientCount: {
    width: 20,
  },
  ingredientInput: {
    flex: 1,
  },
  fixedButton: {
    position: "absolute",
    left: theme.spacing.s,
    right: theme.spacing.s,
  },
});
