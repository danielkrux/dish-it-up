import { useRouter } from "expo-router";
import React from "react";
import * as ContextMenu from "zeego/context-menu";

import { Platform } from "react-native";
import useDeleteRecipe from "../hooks/useDeleteRecipe";
import RecipeImageCard, { RecipeImageCardProps } from "./RecipeImageCard";

type RecipeImageCardWithContextProps = RecipeImageCardProps;

function RecipeImageCardWithContext(props: RecipeImageCardWithContextProps) {
	const router = useRouter();

	const { mutate } = useDeleteRecipe(Number(props.recipe?.id), {
		onSuccess: () => router.push("/"),
	});

	return (
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<RecipeImageCard classsName="p-1" {...props} />
			</ContextMenu.Trigger>
			{Platform.OS === "ios" && (
				<ContextMenu.Content>
					<ContextMenu.Preview borderRadius={16} preferredCommitStyle="pop">
						<RecipeImageCard classsName="w-screen p-1" {...props} />
					</ContextMenu.Preview>
					<ContextMenu.Item
						key="edit"
						onSelect={() => router.push(`/recipe/${props.recipe?.id}/edit`)}
					>
						<ContextMenu.ItemIcon ios={{ name: "pencil" }} />
						<ContextMenu.ItemTitle>Edit</ContextMenu.ItemTitle>
					</ContextMenu.Item>
					<ContextMenu.Item
						key="groceries"
						onSelect={() =>
							router.push(`/recipe/${props.recipe?.id}/select-groceries`)
						}
					>
						<ContextMenu.ItemIcon ios={{ name: "cart" }} />
						<ContextMenu.ItemTitle>Add to grocery list</ContextMenu.ItemTitle>
					</ContextMenu.Item>
					<ContextMenu.Item onSelect={() => mutate()} destructive key="delete">
						<ContextMenu.ItemIcon ios={{ name: "trash" }} />
						<ContextMenu.ItemTitle>Delete recipe</ContextMenu.ItemTitle>
					</ContextMenu.Item>
				</ContextMenu.Content>
			)}
		</ContextMenu.Root>
	);
}

export default RecipeImageCardWithContext;
