import { Slot, useRouter } from "expo-router";
import { View } from "react-native";
import Animated, { SlideInRight, SlideOutRight } from "react-native-reanimated";
import ContextMenu from "~/components/ContextMenu/ContextMenu";
import Icon from "~/components/Icon";
import IconButton from "~/components/IconButton";

import useHomeContext from "~/features/home/hooks/useHomeContext";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";
import useDeleteRecipe from "~/features/recipe/hooks/useDeleteRecipe";

export default function HomeTabLayout() {
	const router = useRouter();
	const { recipeId, setRecipeId } = useHomeContext();

	const { mutate } = useDeleteRecipe(recipeId, {
		onSuccess: handleDelete,
	});

	function handleDelete() {
		setRecipeId(undefined);
	}

	return (
		<View className="flex-1 flex-row">
			<Slot />
			{recipeId && (
				<Animated.View
					entering={SlideInRight}
					exiting={SlideOutRight}
					className="flex-1 bg-white z-50"
				>
					<View className="flex-row justify-between px-4 py-2">
						<IconButton
							size="medium"
							icon="x"
							onPress={() => setRecipeId(undefined)}
						/>
						<View className="flex-row g-2">
							<IconButton
								size="medium"
								icon="maximize-2"
								onPress={() => router.push(`/recipe/${recipeId}/`)}
							/>
							<ContextMenu
								iconButtonSize="medium"
								actions={[
									{
										label: "Add to grocery list",
										onPress: () =>
											router.push(`/recipe/${recipeId}/select-groceries`),
										icon: "shopping-cart",
									},
									{
										label: "Edit...",
										onPress: () => router.push(`/recipe/${recipeId}/edit`),
										icon: "edit-2",
									},
									{
										label: "Delete",
										onPress: () => mutate(),
										icon: "trash-2",
										destructive: true,
									},
								]}
							/>
						</View>
					</View>
					<RecipeDetail id={recipeId} />
				</Animated.View>
			)}
		</View>
	);
}
