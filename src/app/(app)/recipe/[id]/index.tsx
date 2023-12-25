import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import ContextMenu from "~/components/ContextMenu/ContextMenu";
import IconButton from "~/components/IconButton";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";
import useDeleteRecipe from "~/features/recipe/hooks/useDeleteRecipe";

export default function RecipeDetailPage() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	const { mutate } = useDeleteRecipe(Number(id), {
		onSuccess: handleDelete,
	});

	function handleDelete() {
		router.push("/");
	}

	return (
		<>
			<Stack.Screen
				options={{
					title: "Recipe",
					headerTitleAlign: "center",
					headerLeft: () => (
						<IconButton
							onPress={router.back}
							icon="chevron-left"
							size="medium"
						/>
					),
					headerRight: () => (
						<ContextMenu
							actions={[
								{
									label: "Add to grocery list",
									onPress: () =>
										router.push(`/(app)/recipe/${id}/select-groceries`),
									icon: "shopping-cart",
								},
								{
									label: "Edit...",
									onPress: () => router.push(`/(app)/recipe/${id}/edit`),
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
					),
				}}
			/>
			<RecipeDetail id={Number(id)} />
		</>
	);
}
