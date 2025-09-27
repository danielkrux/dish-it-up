import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, View } from "react-native";

import FloatingButton from "~/components/FloatingButton";
import IconButton from "~/components/IconButton";
import ListButton from "~/components/ListButton";
import Text from "~/components/Text";
import useCreateGroceryListItem from "~/features/grocery-list/hooks/useCreateGroceryListItem";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import type { Ingredient } from "~/features/recipe/recipe.types";
import {
  findRecipeYieldAmount,
  parseIngredientAmount,
} from "~/features/recipe/recipe.utils";
import { roundHalf } from "~/utils/number";

function SelectGroceries() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { data } = useFetchRecipe(Number(id));
  const [yieldMultiplier, setYieldsMultiplier] = useState(1);
  const recipeYieldAmount = findRecipeYieldAmount(data?.recipe_yield ?? "");

  const [selected, setSelected] = useState<Ingredient[]>(
    data?.ingredients ?? []
  );
  const { mutate, isLoading } = useCreateGroceryListItem({
    onSuccess: router.back,
  });

  function handleIngredientPress(ingredient: Ingredient) {
    if (selected.find((item) => item.id === ingredient.id)) {
      return setSelected((prev) =>
        prev.filter((item) => item.id !== ingredient.id)
      );
    }
    return setSelected((prev) => [...prev, ingredient]);
  }

  function handleSave() {
    const selectedIngredients = selected.map((i) => {
      if (i.amount) {
        const parsedAmount = parseIngredientAmount(i.amount);
        return { ...i, amount: parsedAmount?.toString() };
      }
      return i;
    });

    mutate(selectedIngredients);
  }

  function addPerson() {
    if (!recipeYieldAmount) return;

    const newYieldMultiplier = roundHalf(yieldMultiplier + 0.5);
    setYieldsMultiplier(newYieldMultiplier);
  }

  function removePerson() {
    if (!recipeYieldAmount) return;

    const newYieldMultiplier = roundHalf(yieldMultiplier - 0.5 - 0.01);
    setYieldsMultiplier(newYieldMultiplier < 1 ? 1 : newYieldMultiplier);
  }

  return (
    <View className="flex-1 py-6">
      <Text className="mx-4 font-display text-3xl">Add to groceries</Text>
      <Text className="mx-4 mb-4 text-bold text-lg text-gray-400">
        {data?.name}
      </Text>
      {recipeYieldAmount && (
        <View className="flex-row items-center gap-3 mb-4 mx-4">
          <IconButton size="small" icon="Minus" onPress={removePerson} />
          <Text>{recipeYieldAmount * yieldMultiplier} persons</Text>
          <IconButton size="small" icon="Plus" onPress={addPerson} />
        </View>
      )}
      <ScrollView
        className="px-4"
        contentContainerStyle={{ paddingBottom: 75 }}
      >
        {data?.ingredients?.map((ingredient, index) => {
          const name = ingredient.name ?? "";
          const parsedAmount = parseIngredientAmount(ingredient.amount);
          const amount = parsedAmount ? parsedAmount * yieldMultiplier : "";
          const unit = ingredient.unit ?? "";

          const label = `${amount} ${unit} ${name}`;

          return (
            <ListButton
              key={name + index}
              selectable
              selected={selected.includes(ingredient)}
              onPress={() => handleIngredientPress(ingredient)}
              label={label}
              className="dark:bg-gray-950"
            />
          );
        })}
      </ScrollView>
      <FloatingButton loading={isLoading} useSafeArea onPress={handleSave}>
        Save
      </FloatingButton>
    </View>
  );
}

export default SelectGroceries;
