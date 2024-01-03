import { Stack, useLocalSearchParams, useRouter } from "expo-router";

import IconButton from "~/components/IconButton";
import RecipeDetailMenu from "~/features/recipe/components/RecipeDetail/Menu";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";

export default function RecipeDetailPage() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

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
						<RecipeDetailMenu
							onDeleteSucces={() => router.push("/")}
							recipeId={Number(id)}
						/>
					),
				}}
			/>
			<RecipeDetail id={Number(id)} />
		</>
	);
}
