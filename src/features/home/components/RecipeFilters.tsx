import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";

import ChipList from "~/components/ChipList";
import { CATEGORIES_QUERY_KEY } from "~/features/app/app.constants";
import { getCategories } from "~/features/recipe/recipe.service";

export const DEFAULT_FILTER = "all";

function RecipeQuickFilter() {
	const params = useLocalSearchParams<{ c?: string }>();
	const appliedCategory = params.c;

	const { data } = useQuery([CATEGORIES_QUERY_KEY], getCategories, {
		select: (data) => {
			const categoriesWithRecipes = data.filter((c) => c.numberOfRecipes > 0);
			const categories = [
				{ name: "All", id: DEFAULT_FILTER },
				...categoriesWithRecipes,
			];
			return categories.map((category) => ({
				label: category.name,
				value: String(category.id),
			}));
		},
	});

	function updateParams(value: string) {
		if (value === DEFAULT_FILTER)
			return router.setParams({ c: DEFAULT_FILTER });
		router.setParams({ c: value });
	}

	if (data && data.length <= 1) return null;

	return (
		<ChipList
			className="mt-1 pr-"
			data={data}
			selectedValues={appliedCategory ? [appliedCategory] : [DEFAULT_FILTER]}
			onPress={updateParams}
			contentContainerStyle="pr-20"
		/>
	);
}

export default RecipeQuickFilter;
