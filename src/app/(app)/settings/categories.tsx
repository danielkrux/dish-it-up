import { useQuery } from "@tanstack/react-query";
import { FlatList, StyleSheet, View } from "react-native";

import FloatingButton from "~/components/FloatingButton";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";
import Modal from "~/components/Modal";
import Text from "~/components/Text";
import { CATEGORIES_QUERY_KEY } from "~/features/app/app.constants";
import useCreateCategory from "~/features/recipe/hooks/useCreateCategory";
import useDeleteCategory from "~/features/recipe/hooks/useDeleteCategory";
import useUpdateCategory from "~/features/recipe/hooks/useUpdateCategory";
import { getCategories } from "~/features/recipe/recipe.service";
import theme from "~/theme";

export default function Settings() {
  const { data } = useQuery([CATEGORIES_QUERY_KEY], getCategories);
  const deleteCategoryMutation = useDeleteCategory();
  const editCategoryMutation = useUpdateCategory();
  const createCategoryMutation = useCreateCategory();

  function addCategory() {
    Modal.show({
      title: "Add Category",
      description: "Enter a name for the new category",
      withPrompt: true,
      onConfirm: (value) => createCategoryMutation.mutate(value),
    });
  }

  function updateCategory(id: number, name?: string | null) {
    Modal.show({
      title: "Edit Category",
      description: "Enter a name for this category",
      withPrompt: true,
      defaultValue: name,
      onConfirm: (value) => editCategoryMutation.mutate({ id, name: value }),
    });
  }

  function deleteCategory(id: number) {
    Modal.show({
      title: "Delete Category",
      description: "Are you sure you want to delete this category?",
      onConfirm: () => deleteCategoryMutation.mutate(id),
    });
  }

  return (
    <>
      {data?.length ? (
        <FlatList
          data={data}
          ItemSeparatorComponent={() => (
            <View className="h-[1] border-b-gray-100 dark:border-b-gray-900 border-b" />
          )}
          renderItem={({ item: category }) => (
            <View key={category.id} style={styles.category}>
              <Text>{category.name}</Text>
              <View style={styles.actions}>
                <IconButton
                  onPress={() => updateCategory(category.id, category.name)}
                  icon="Pencil"
                  size="medium"
                />
                <IconButton
                  onPress={() => deleteCategory(category.id)}
                  icon="Trash2"
                  size="medium"
                />
              </View>
            </View>
          )}
        />
      ) : (
        <View className="bg-gray-100 dark:bg-gray-900 rounded-lg mx-3 p-10 py-12 mt-12 items-center">
          <Icon className="mb-5" name="Tag" size={64} />
          <Text type="header" size="l" className="text-center mb-2">
            You don't have any categories yet!
          </Text>
          <Text className="text-center">
            You can create a category with the button below.
          </Text>
        </View>
      )}
      <FloatingButton useSafeArea onPress={addCategory}>
        Add Category
      </FloatingButton>
    </>
  );
}

const styles = StyleSheet.create({
  category: {
    paddingVertical: theme.spacing.s,
    paddingHorizontal: theme.spacing.m,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actions: {
    gap: theme.spacing.s,
    flexDirection: "row",
  },
});
