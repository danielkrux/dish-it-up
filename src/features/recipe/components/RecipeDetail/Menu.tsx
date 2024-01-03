import { useRouter } from "expo-router";
import React from "react";
import * as Menu from "zeego/dropdown-menu";

import IconButton from "~/components/IconButton";
import useDeleteRecipe from "../../hooks/useDeleteRecipe";

type RecipeDetailMenuProps = {
	recipeId: number;
	onDeleteSucces: () => void;
};

function RecipeDetailMenu({ recipeId, onDeleteSucces }: RecipeDetailMenuProps) {
	const router = useRouter();

	const { mutate } = useDeleteRecipe(recipeId, {
		onSuccess: onDeleteSucces,
	});

	return (
		<Menu.Root>
			<Menu.Trigger>
				<IconButton size="medium" icon="more-vertical" />
			</Menu.Trigger>
			<Menu.Content>
				<Menu.Item
					key="edit"
					onSelect={() => router.push(`/recipe/${recipeId}/edit`)}
				>
					<Menu.ItemIcon ios={{ name: "pencil" }} />
					<Menu.ItemTitle> Edit...</Menu.ItemTitle>
				</Menu.Item>
				<Menu.Item
					key="add-to-grocery-list"
					onSelect={() => router.push(`/recipe/${recipeId}/select-groceries`)}
				>
					<Menu.ItemIcon ios={{ name: "cart" }} />
					<Menu.ItemTitle>Add to grocery list</Menu.ItemTitle>
				</Menu.Item>
				<Menu.Item key="delete" onSelect={mutate} destructive>
					<Menu.ItemIcon ios={{ name: "trash" }} />
					<Menu.ItemTitle>Delete</Menu.ItemTitle>
				</Menu.Item>
			</Menu.Content>
		</Menu.Root>
	);
}

export default RecipeDetailMenu;
