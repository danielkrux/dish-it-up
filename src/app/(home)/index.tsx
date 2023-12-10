import { Portal } from "@gorhom/portal";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { ListRenderItemInfo, Pressable, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Animated, {
	FadeIn,
	FadeOut,
	SlideInRight,
	SlideOutRight,
} from "react-native-reanimated";
import { FullWindowOverlay } from "react-native-screens";

import FloatingButton from "~/components/FloatingButton";
import { DEFAULT_FILTER } from "~/features/home/components/RecipeFilters";
import SeachAndFilter from "~/features/home/components/SearchAndFilter";
import RecipeDetail from "~/features/recipe/components/RecipeDetail";
import RecipeImageCard from "~/features/recipe/components/RecipeImageCard";
import { getRecipes } from "~/features/recipe/recipe.service";
import { Recipe } from "~/features/recipe/recipe.types";
import { useRefreshOnFocus } from "~/hooks/useRefreshOnFocus";
import theme, { isTablet } from "~/theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const extractKey = (item: Recipe) => item.id.toString();

function filterRecipesByCategory(recipes: Recipe[], categoryId?: string) {
	if (!categoryId || categoryId === DEFAULT_FILTER) return recipes;
	return recipes.filter((recipe) => {
		return recipe.categories.find((c) => c.id === Number(categoryId));
	});
}

export default function Home() {
	const { q, c } = useLocalSearchParams<{ q?: string; c?: string }>();
	const [recipeId, setRecipeId] = useState<number | null>(null);
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
	}, []);

	return (
		<>
			<View className="flex-1">
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={extractKey}
					ListHeaderComponent={SeachAndFilter}
					contentContainerStyle={styles.recipeListContent}
					className="px-4 md:px-8 mt-1"
					numColumns={isTablet ? 3 : 1}
					key={2}
				/>
				<FloatingButton onPress={() => router.push("/recipe/add/")}>
					Add recipe
				</FloatingButton>
			</View>
			<>
				{recipeId && (
					<AnimatedPressable
						entering={FadeIn}
						exiting={FadeOut}
						onPress={() => setRecipeId(null)}
						className="absolute bottom-0 top-0 left-0 right-0 bg-white/75"
					/>
				)}
				{recipeId && (
					<Animated.View
						className="absolute top-0 bottom-4 right-4 bg-white w-2/4 rounded-2xl shadow z-50"
						entering={SlideInRight}
						exiting={SlideOutRight}
					>
						<RecipeDetail id={recipeId} onDelete={() => {}} />
					</Animated.View>
				)}
			</>
		</>
	);
}

const styles = StyleSheet.create({
	recipeListContent: {
		paddingBottom: 100,
		gap: theme.spacing.m,
	},
});
