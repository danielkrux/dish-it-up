import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View } from "react-native";

import ChipList from "~/components/ChipList";
import Text from "~/components/Text";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";

export default function RecipeDetail({ id }: { id: number }) {
	const { data } = useFetchRecipe(id);

	return (
		<ScrollView
			contentInsetAdjustmentBehavior="automatic"
			className="flex-1 py-4"
		>
			<View className="mb-4">
				<Text className="mb-4 mx-4" type="header">
					{data?.name}
				</Text>
				{data?.image_url && (
					<Image
						source={{ uri: data?.image_url }}
						className="mx-4 aspect-video rounded-3xl"
					/>
				)}
			</View>
			{data?.description && (
				<Text className="mx-4 mb-4">{data?.description}</Text>
			)}
			<View className="px-6 py-6 mb-4 flex-row justify-evenly bg-primary">
				<View className="items-center">
					<Text className="text-secondary" type="header" size="xl">
						{data?.recipe_yield}
					</Text>
					<Text type="body" size="l" className="text-secondary">
						Servings
					</Text>
				</View>
				<View className="items-center">
					<Text className="text-secondary" type="header" size="xl">
						{data?.total_time}
					</Text>
					<Text type="body" size="l" className="text-secondary">
						Total Time
					</Text>
				</View>
			</View>
			<ChipList
				className="mb-2 mx-4"
				data={data?.categories.map((c) => ({
					value: String(c.id),
					label: c.name,
				}))}
			/>
			<View className="mb-5 mx-4">
				<Text type="header" size="l">
					Ingredients
				</Text>
				{data?.ingredients?.map((ingredient, i) => (
					<Text key={`${ingredient}-${i}`} type="body">
						• {ingredient}
					</Text>
				))}
			</View>
			<View className="mx-4 mb-5">
				<Text type="header" size="l">
					Instructions
				</Text>
				{data?.instructions?.map((instruction, i) => (
					<View key={`${instruction}-${i}`} className="mb-3 flex-row g-3">
						<Text type="header" size="m">
							{i + 1}
						</Text>
						<Text className="flex-1" key={`${instruction}-${i}`} type="body">
							{instruction}
						</Text>
					</View>
				))}
			</View>
		</ScrollView>
	);
}