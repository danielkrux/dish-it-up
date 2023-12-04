import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback } from "react";
import {
	CellRendererProps,
	FlatList,
	Keyboard,
	ListRenderItemInfo,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";

import FloatingButton from "../../components/FloatingButton";
import { DEFAULT_FILTER } from "../../features/home/components/RecipeFilters";
import SeachAndFilter from "../../features/home/components/SearchAndFilter";
import RecipeImageCard from "../../features/recipe/components/RecipeImageCard";
import { getRecipes } from "../../features/recipe/recipe.service";
import { Recipe } from "../../features/recipe/recipe.types";
import { useRefreshOnFocus } from "../../hooks/useRefreshOnFocus";
import theme from "../../theme";

const extractKey = (item: Recipe) => `${item.id}`;

const AnimatedView = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList<Recipe>);

function filterRecipesByCategory(recipes: Recipe[], categoryId?: string) {
	if (!categoryId || categoryId === DEFAULT_FILTER) return recipes;
	return recipes.filter((recipe) => {
		return recipe.categories.find((c) => c.id === Number(categoryId));
	});
}

export default function Home() {
	const { q, c } = useLocalSearchParams<{ q?: string; c?: string }>();
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

	const renderItem = useCallback(({ item }: ListRenderItemInfo<Recipe>) => {
		const handlePress = () => {
			router.push(`/recipe/${item.id}/`);
		};
		return <RecipeImageCard recipe={item} onPress={handlePress} />;
	}, []);

	const renderCell = useCallback(
		(props: CellRendererProps<Recipe>) => (
			<Animated.View
				{...props}
				entering={FadeIn}
				exiting={FadeOut}
				layout={Layout}
			/>
		),
		[],
	);

	return (
		<View className="flex-1">
			<AnimatedView
				activeOpacity={1}
				className="flex-1"
				layout={Layout.duration(200)}
			>
				<AnimatedFlatList
					ListHeaderComponent={SeachAndFilter}
					data={data}
					keyExtractor={extractKey}
					style={{ paddingHorizontal: theme.spacing.m }}
					CellRendererComponent={renderCell}
					contentContainerStyle={styles.recipeListContent}
					renderItem={renderItem}
				/>
			</AnimatedView>
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
});
