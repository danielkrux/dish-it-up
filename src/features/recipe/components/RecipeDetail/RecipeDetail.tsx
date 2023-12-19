import clsx from "clsx";
import { Image } from "expo-image";
import { ReactNode } from "react";
import { ScrollView, View } from "react-native";

import ChipList from "~/components/ChipList";
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

	const styles = {
		sm: "py-4",
		md: "px-20 py-10",
	};

	return (
		<ScrollView
			onLayout={onLayout}
			contentInsetAdjustmentBehavior="automatic"
			className={clsx("flex-1 py-4", styles[containerSize])}
		>
			{header}
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
			<Meta recipe={data} className="mb-4 mx-2" />
			<ChipList
				className="mb-2 mx-4"
				data={data?.categories.map((c) => ({
					value: String(c.id),
					label: c.name,
				}))}
			/>
			<Ingredients recipe={data} className="mb-2 mx-4" />
			<Instructions recipe={data} className="mx-4 mb-5" />
		</ScrollView>
	);
}
