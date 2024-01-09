import { useRouter } from "expo-router";
import React from "react";
import * as Menu from "zeego/dropdown-menu";

import { BottomSheetModal as _BottomSheetModal } from "@gorhom/bottom-sheet";
import IconButton from "~/components/IconButton";
import useDeleteRecipe from "../../hooks/useDeleteRecipe";

type RecipeDetailMenuProps = {
	recipeId: number;
	onDeleteSucces: () => void;
	onShowLogRecipe: () => void;
};

function RecipeDetailMenu({
	recipeId,
	onDeleteSucces,
	onShowLogRecipe,
}: RecipeDetailMenuProps) {
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
					<Menu.ItemTitle> Edit</Menu.ItemTitle>
				</Menu.Item>
				<Menu.Group>
					<Menu.Item key="cooked" onSelect={onShowLogRecipe}>
						<Menu.ItemIcon ios={{ name: "checkmark" }} />
						<Menu.ItemTitle>Log recipe</Menu.ItemTitle>
					</Menu.Item>
					<Menu.Item
						key="add-to-grocery-list"
						onSelect={() => router.push(`/recipe/${recipeId}/select-groceries`)}
					>
						<Menu.ItemIcon ios={{ name: "cart" }} />
						<Menu.ItemTitle>Add to grocery list</Menu.ItemTitle>
					</Menu.Item>
					<Menu.Sub>
						<Menu.SubTrigger key="plan-recipe">
							<Menu.ItemIcon ios={{ name: "book" }} />
							<Menu.ItemTitle>Plan recipe...</Menu.ItemTitle>
						</Menu.SubTrigger>
						<Menu.SubContent>
							<Menu.Item key="today">Today</Menu.Item>
							<Menu.Item key="tomorrow">Tomorrow</Menu.Item>
							<Menu.Item key="other">Other...</Menu.Item>
						</Menu.SubContent>
					</Menu.Sub>
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
