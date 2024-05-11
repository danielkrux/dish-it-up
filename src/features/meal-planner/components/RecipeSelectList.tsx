import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { FlatList, ListRenderItemInfo, Pressable, View } from "react-native";

import Button from "~/components/Button";
import Check from "~/components/Check";
import Text from "~/components/Text";
import RecipeImageCard from "~/features/recipe/components/RecipeImageCard";
import recipeKeys from "~/features/recipe/recipe.queryKeys";
import { getRecipes } from "~/features/recipe/recipe.service";
import { Recipe } from "~/features/recipe/recipe.types";
import useSafeAreaInsets from "~/hooks/useSafeAreaInsets";

function keyExtractor(recipe: Recipe) {
  return recipe.id.toString();
}

export type RecipeSelectListProps = {
  date: Date;
  isLoading: boolean;
  selectedRecipes: number[];
  onRecipeSelect: (recipe: Recipe) => void;
  onSave: () => void;
};

function RecipeSelectList({
  date,
  isLoading,
  selectedRecipes,
  onRecipeSelect,
  onSave,
}: RecipeSelectListProps) {
  const insets = useSafeAreaInsets();
  const { data } = useQuery(recipeKeys.all, () => getRecipes());

  function renderRecipe({ item }: ListRenderItemInfo<Recipe>) {
    return (
      <Pressable
        onPress={() => onRecipeSelect(item)}
        className="flex-row justify-between items-center gap-2"
      >
        <RecipeImageCard
          classsName="flex-1"
          recipe={item}
          onPress={() => onRecipeSelect(item)}
        />
        <Check
          onPress={() => onRecipeSelect(item)}
          selected={selectedRecipes.includes(item.id)}
        />
      </Pressable>
    );
  }

  return (
    <View className="flex-1 py-6">
      {data?.length ? (
        <FlatList
          data={data}
          renderItem={renderRecipe}
          keyExtractor={keyExtractor}
          contentContainerClassName="gap-4 px-5 pb-20"
          ListHeaderComponent={
            <Text className="mb-2 mt-2" type="header" size="2xl">
              Select Recipes for{" "}
              <Text type="header" className="text-acapulco-400">
                {format(date, "EEEE")}
              </Text>
            </Text>
          }
        />
      ) : (
        <Text size="l" className="text-gray-300 self-center">
          You don't have any recipes yet!
        </Text>
      )}
      <Button
        className="absolute mx-5 left-0 right-0"
        style={{ bottom: insets.bottom }}
        onPress={onSave}
        size="large"
        loading={isLoading}
      >
        Save
      </Button>
    </View>
  );
}

export default RecipeSelectList;
