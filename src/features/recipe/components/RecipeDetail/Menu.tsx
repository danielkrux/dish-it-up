import { useRouter } from "expo-router";
import * as sharing from "expo-sharing";
import React from "react";
import { Linking } from "react-native";
import * as Menu from "zeego/dropdown-menu";

import IconButton from "~/components/IconButton";
import { createRecipeShare } from "~/features/share/share.service";
import useDeleteRecipe from "../../hooks/useDeleteRecipe";
import useFetchRecipe from "../../hooks/useFetchRecipe";

type RecipeDetailMenuProps = {
  recipeId: number;
  onDeleteSucces?: () => void;
  onShowLogRecipe?: () => void;
};

function RecipeDetailMenu({
  recipeId,
  onDeleteSucces,
  onShowLogRecipe,
}: RecipeDetailMenuProps) {
  const router = useRouter();
  const { data } = useFetchRecipe(recipeId);
  const { mutate } = useDeleteRecipe(recipeId, {
    onSuccess: onDeleteSucces,
  });

  async function handleShare() {
    const id = await createRecipeShare(recipeId);

    const url = `https://dish-it-up.app/share/${id}`;

    sharing.shareAsync(url, { mimeType: "text/plain" });
  }

  return (
    <Menu.Root>
      <Menu.Trigger>
        <IconButton size="medium" icon="EllipsisVertical" />
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item
          key="edit"
          onSelect={() => router.push(`/recipe/${recipeId}/edit`)}
        >
          <Menu.ItemTitle>Edit</Menu.ItemTitle>
        </Menu.Item>
        <Menu.Group>
          <Menu.Item key="cooked" onSelect={onShowLogRecipe}>
            <Menu.ItemIcon ios={{ name: "checkmark.circle" }} />
            <Menu.ItemTitle>Log recipe</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item
            key="add-to-grocery-list"
            onSelect={() => router.push(`/recipe/${recipeId}/select-groceries`)}
          >
            <Menu.ItemIcon ios={{ name: "cart" }} />
            <Menu.ItemTitle>Add to groceries</Menu.ItemTitle>
          </Menu.Item>
          <Menu.Item key="share" onSelect={handleShare}>
            <Menu.ItemIcon ios={{ name: "square.and.arrow.up" }} />
            <Menu.ItemTitle>Share</Menu.ItemTitle>
          </Menu.Item>
          {data?.source_url && (
            <Menu.Item
              key="website"
              onSelect={() => Linking.openURL(data.source_url ?? "")}
            >
              <Menu.ItemIcon ios={{ name: "globe" }} />
              <Menu.ItemTitle>Visit website</Menu.ItemTitle>
            </Menu.Item>
          )}
        </Menu.Group>
        <Menu.Item key="delete" onSelect={mutate} destructive>
          <Menu.ItemIcon ios={{ name: "trash" }} />
          <Menu.ItemTitle>Delete</Menu.ItemTitle>
        </Menu.Item>
      </Menu.Content>
    </Menu.Root>
  );
}

export default RecipeDetailMenu;
