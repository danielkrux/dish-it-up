import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import FloatingButton from "~/components/FloatingButton";
import ListButton from "~/components/ListButton";
import Text from "~/components/Text";
import useCreateGroceryListItem from "~/features/grocery-list/hooks/useCreateGroceryListItem";
import useFetchRecipes from "~/features/recipe/hooks/useFetchRecipes";
import { Ingredient } from "~/features/recipe/recipe.types";

function GroceryList() {
  const router = useRouter();
  const { ids } = useLocalSearchParams<{ ids: string }>();
  const idsArray = ids.split(",").map((id) => Number(id));
  const { data } = useFetchRecipes(idsArray);

  const [selected, setSelected] = useState<Ingredient[]>([]);

  useEffect(() => {
    const allIngredients = data?.flatMap((recipe) => recipe.ingredients ?? []);
    setSelected(allIngredients ?? []);
  }, [data]);

  const { mutate } = useCreateGroceryListItem({
    onSuccess: () => router.back(),
  });

  function handleIngredientPress(ingredient: Ingredient) {
    if (selected.find((item) => item.id === ingredient.id)) {
      return setSelected((prev) =>
        prev.filter((item) => item.id !== ingredient.id)
      );
    }
    return setSelected((prev) => [...prev, ingredient]);
  }

  function mergeSelectedIngredients() {
    const mergedIngredients = selected.reduce<Ingredient[]>(
      (acc, ingredient) => {
        const existingIngredient = acc.find(
          (i) => i.name === ingredient.name && i.unit === ingredient.unit
        );

        if (!existingIngredient) {
          acc.push(ingredient);
          return acc;
        }

        return acc.map((i) => {
          const exsits =
            i.name === ingredient.name && i.unit === ingredient.unit;

          if (!exsits) return i;

          const newAmount =
            Number(existingIngredient.amount) + Number(ingredient.amount);

          return { ...i, amount: newAmount.toString() };
        });
      },
      []
    );

    return mergedIngredients;
  }

  function handleSave() {
    const mergedIngredients = mergeSelectedIngredients();
    mutate(mergedIngredients);
  }

  return (
    <View className="flex-1 py-6">
      <ScrollView
        className="px-4"
        contentContainerStyle={{ paddingBottom: 75 }}
      >
        <Text size="2xl" className="mb-2" type="header">
          Create Grocery List
        </Text>
        {data?.map((recipe) => (
          <View className="mb-6" key={recipe.id}>
            <View className="flex-1 flex-row items-start">
              <Text className="flex-1" type="bodyBold" size="m">
                {recipe.name}
              </Text>
            </View>
            {recipe.ingredients?.map((ingredient) => {
              const name = ingredient.name ?? "";
              const parsedAmount = ingredient.amount;
              const amount = parsedAmount ? parsedAmount : "";
              const unit = ingredient.unit ?? "";

              const label = `${amount} ${unit} ${name}`.trim();

              return (
                <ListButton
                  key={ingredient.id}
                  selectable
                  selected={selected?.includes(ingredient)}
                  onPress={() => handleIngredientPress(ingredient)}
                  label={label}
                  className="dark:bg-gray-950"
                />
              );
            })}
          </View>
        ))}
      </ScrollView>
      <FloatingButton useSafeArea onPress={handleSave}>
        Save
      </FloatingButton>
    </View>
  );
}

export default GroceryList;
