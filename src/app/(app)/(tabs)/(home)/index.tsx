import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback } from "react";
import { ListRenderItemInfo, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import FloatingButton from "~/components/FloatingButton";
import { DEFAULT_FILTER } from "~/features/home/components/RecipeFilters";
import SeachAndFilter from "~/features/home/components/SearchAndFilter";
import { useHandleUrlShare } from "~/features/home/hooks/useHandleUrlShare";
import useHomeContext from "~/features/home/hooks/useHomeContext";
import RecipeImageCardWithContext from "~/features/recipe/components/RecipeImageCardWithContext";
import { getRecipes } from "~/features/recipe/recipe.service";
import { Recipe } from "~/features/recipe/recipe.types";
import { useRefreshOnFocus } from "~/hooks/useRefreshOnFocus";
import theme, { isTablet } from "~/theme";

const extractKey = (item: Recipe) => item.id.toString();

function filterRecipesByCategory(recipes: Recipe[], categoryId?: string) {
	if (!categoryId || categoryId === DEFAULT_FILTER) return recipes;
	return recipes.filter((recipe) => {
		return recipe.categories.find((c) => c.id === Number(categoryId));
	});
}

export default function Home() {
	const router = useRouter();
	const { q, c } = useLocalSearchParams<{ q?: string; c?: string }>();
	const { recipeId, setRecipeId } = useHomeContext();
	const query = q;

	useHandleUrlShare();

	const { data, refetch } = useQuery(
		["recipes", query],
		() => getRecipes(query),
		{
			select: useCallback(
				(data: Recipe[]) => filterRecipesByCategory(data, c),
				[c],
			),
			keepPreviousData: true,
		},
	);

	useRefreshOnFocus(refetch);

	const renderItem = useCallback(
		({ item }: ListRenderItemInfo<Recipe>) => {
			const handlePress = () => {
				if (isTablet) {
					setRecipeId(item.id);
				} else {
					router.push(`/(app)/recipe/${item.id}/`);
				}
			};

			return (
				<Animated.View entering={FadeIn} exiting={FadeOut}>
					<RecipeImageCardWithContext recipe={item} onPress={handlePress} />
				</Animated.View>
			);
		},
		[setRecipeId, router],
	);

	return (
		<View className="flex-1">
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={extractKey}
				ListHeaderComponent={SeachAndFilter}
				contentContainerStyle={styles.recipeListContent}
				className="px-4 md:px-8 mt-1"
				numColumns={isTablet && !recipeId ? 2 : 1}
				columnWrapperStyle={
					isTablet && !recipeId ? styles.recipeColumnWrapper : undefined
				}
				key={recipeId ? "single-column" : "multi-column"}
			/>
			<FloatingButton onPress={() => router.push("/recipe/add/")}>
				Add recipe
			</FloatingButton>
		</View>
	);
}

const styles = StyleSheet.create({
	recipeListContent: {
		paddingBottom: 100,
		gap: theme.spacing.m,
	},
	recipeColumnWrapper: {
		gap: theme.spacing.m,
	},
});