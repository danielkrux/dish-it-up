import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import { ListRenderItemInfo, Pressable, StyleSheet, View } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

import FloatingButton from "~/components/FloatingButton";
import { DEFAULT_FILTER } from "~/features/home/components/RecipeFilters";
import SeachAndFilter from "~/features/home/components/SearchAndFilter";
import useHomeContext from "~/features/home/hooks/useHomeContext";
import RecipeImageCard from "~/features/recipe/components/RecipeImageCard";
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
	const { q, c } = useLocalSearchParams<{ q?: string; c?: string }>();
	const { setRecipeId } = useHomeContext();
	const query = q;

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
					router.push(`/recipe/${item.id}/`);
				}
			};

			return (
				<Animated.View entering={FadeIn} exiting={FadeOut}>
					<RecipeImageCard recipe={item} onPress={handlePress} />
				</Animated.View>
			);
		},
		[setRecipeId],
	);

	return (
		<>
			<View className="flex-1">
				<Animated.FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={extractKey}
					ListHeaderComponent={SeachAndFilter}
					contentContainerStyle={styles.recipeListContent}
					className="px-4 md:px-8 mt-1"
				/>
				<FloatingButton onPress={() => router.push("/recipe/add/")}>
					Add recipe
				</FloatingButton>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	recipeListContent: {
		paddingBottom: 100,
		gap: theme.spacing.m,
	},
});
