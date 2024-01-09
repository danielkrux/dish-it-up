import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useRef } from "react";

import IconButton from "~/components/IconButton";
import LogRecipe from "~/features/recipe/components/LogRecipe";
import RecipeDetailMenu from "~/features/recipe/components/RecipeDetail/Menu";
import RecipeDetail from "~/features/recipe/components/RecipeDetail/RecipeDetail";

export default function RecipeDetailPage() {
	const ref = useRef<BottomSheetModal>(null);

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
							onShowLogRecipe={() => ref.current?.present()}
							onDeleteSucces={() => router.push("/")}
							recipeId={Number(id)}
						/>
					),
				}}
			/>
			<RecipeDetail id={Number(id)} />
			<LogRecipe recipeId={Number(id)} ref={ref} />
		</>
	);
}
