import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

import { Image } from "expo-image";
import { useRouter } from "expo-router";
import {
	ActivityIndicator,
	Platform,
	ScrollView,
	StatusBar,
	StyleSheet,
	View,
} from "react-native";

import BlurButton from "~/components/BlurButton";
import Button from "~/components/Button";
import Icon from "~/components/Icon";
import Text from "~/components/Text";
import Ingredients from "~/features/recipe/components/RecipeDetail/Ingredients";
import Instructions from "~/features/recipe/components/RecipeDetail/Instructions";
import useCreateRecipe from "~/features/recipe/hooks/useCreateRecipe";
import { parseRecipe } from "~/features/recipe/recipe.service";
import theme from "~/theme";
import { isValidUrl } from "~/utils/url";

export default function AddRecipeConfirmScreen() {
	const { url: urlParam } = useLocalSearchParams();
	const statusBarHeight = StatusBar.currentHeight;

	const router = useRouter();
	const url = decodeURIComponent(urlParam as string);

	const urlValid = isValidUrl(url);

	const { data, isError, isLoading } = useQuery(
		["parse-recipe", url],
		() => parseRecipe(url as string),
		{
			enabled: urlValid,
		},
	);

	const { mutate } = useCreateRecipe();

	if (isError) {
		return (
			<View className="flex-1 justify-center items-center">
				<Icon
					color={theme.colors.primary}
					name="alert-circle"
					size={48}
					className="mb-4"
				/>
				<Text className="mb-4" type="body">
					Something went wrong importing the recipe
				</Text>
				<Button onPress={() => router.back()}>Go back</Button>
			</View>
		);
	}

	if (isLoading || !data) {
		return <ActivityIndicator className="flex-1" size={48} />;
	}

	return (
		<ScrollView className="pb-6" contentContainerStyle={styles.container}>
			{data.images?.length && (
				<Image className="h-72 mb-5" source={data.images[0]} />
			)}
			<View
				className="absolute top-0 left-0 right-0 z-10 flex-row justify-between px-5"
				style={[
					{
						top: Platform.select({
							ios: theme.spacing.l,
							android: (statusBarHeight ?? 0) + theme.spacing.m,
						}),
					},
				]}
			>
				<BlurButton icon="chevron-left" onPress={() => router.back()} />
				<BlurButton
					label="Add recipe"
					icon="plus-circle"
					onPress={() => mutate(data)}
				/>
			</View>
			<View className="px-4">
				<Text className="mb-1 font-display text-4xl">{data.name}</Text>
				<Text className="mb-7" type="body">
					{data.description}
				</Text>
				<Ingredients recipe={data} className="mb-7" />
				<Instructions recipe={data} className="mb-5" />
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingBottom: theme.spacing.xl,
	},
});
