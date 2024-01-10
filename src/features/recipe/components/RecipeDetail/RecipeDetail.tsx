import { Image } from "expo-image";
import { ReactNode } from "react";
import { View } from "react-native";

import ChipList from "~/components/ChipList";
import ScrollView from "~/components/ScrollView";
import StarRating from "~/components/StarRating";
import Text from "~/components/Text";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import useContainerBreakpoint from "~/hooks/useContainerBreakpoint";
import Ingredients from "./Ingredients";
import Instructions from "./Instructions";
import Meta from "./Meta";

export default function RecipeDetail({
	id,
	header,
}: { id: number; header?: ReactNode }) {
	const { data } = useFetchRecipe(id);
	const { containerSize, onLayout } = useContainerBreakpoint();

	if (containerSize === "md") {
		return (
			<View className="px-20 flex-1">
				<View className="flex-1 flex-row g-10 mb-10">
					<ScrollView contentContainerStyle="pt-5" className="flex-1">
						<Image
							source={data?.images?.[0]}
							className="aspect-square rounded-2xl mb-4"
						/>
						<Text className="mb-4 font-display text-xl">{data?.name}</Text>
						<ChipList
							className="mb-2"
							data={data?.categories.map((c) => ({
								value: String(c.id),
								label: c.name,
							}))}
						/>
						{data?.description && (
							<Text className="mb-4 max-w-screen-sm">{data?.description}</Text>
						)}
						<Meta recipe={data} className="mb-4" />
					</ScrollView>
					<ScrollView contentContainerStyle="pt-5" className="flex-1">
						<Instructions recipe={data} className="mx-4 mb-5" />
					</ScrollView>
					<ScrollView contentContainerStyle="pt-5" className="flex-1">
						<Ingredients recipe={data} className="mb-2 mx-4" />
					</ScrollView>
				</View>
			</View>
		);
	}

	return (
		<ScrollView
			onLayout={onLayout}
			contentInsetAdjustmentBehavior="automatic"
			className="flex-1 py-4 px-4"
		>
			{header}
			<View className="mb-4">
				<View className="flex-row justify-between items-end mb-4 g-4">
					<Text className="font-display text-4xl">{data?.name}</Text>
					<StarRating initialValue={data?.rating} short className="mb-1.5" />
				</View>

				<Image
					source={data?.images?.[0]}
					className="aspect-video rounded-2xl"
				/>
			</View>
			{data?.description && <Text className="mb-4">{data?.description}</Text>}
			<Meta recipe={data} className="mb-5" />
			<ChipList
				className="mb-5"
				data={data?.categories.map((c) => ({
					value: String(c.id),
					label: c.name,
				}))}
			/>
			<Ingredients recipe={data} className="mb-7" />
			<Instructions recipe={data} className="mb-5" />
		</ScrollView>
	);
}
