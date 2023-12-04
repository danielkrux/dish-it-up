import { Image } from "expo-image";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";

import ChipList from "~/components/ChipList";
import ContextMenu from "~/components/ContextMenu/ContextMenu";
import IconButton from "~/components/IconButton";
import Text from "~/components/Text";
import useDeleteRecipe from "~/features/recipe/hooks/useDeleteRecipe";
import useFetchRecipe from "~/features/recipe/hooks/useFetchRecipe";
import theme, { SCREEN_WIDTH } from "~/theme";

export default function RecipeDetail() {
	const { id } = useLocalSearchParams();
	const router = useRouter();
	const { data } = useFetchRecipe(Number(id));

	const { mutate } = useDeleteRecipe(Number(id), {
		onSuccess: () => router.push("/"),
	});

	return (
		<>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={styles.container}
			>
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
							<ContextMenu
								actions={[
									{
										label: "Add to grocery list",
										onPress: () =>
											router.push(`/recipe/${data?.id}/select-groceries`),
										icon: "shopping-cart",
									},
									{
										label: "Edit...",
										onPress: () => router.push(`/recipe/${data?.id}/edit`),
										icon: "edit-2",
									},
									{
										label: "Delete",
										onPress: () => mutate(),
										icon: "trash-2",
										destructive: true,
									},
								]}
							/>
						),
					}}
				/>
				<View>
					<Text style={styles.title} type="header">
						{data?.name}
					</Text>
					{data?.image_url && (
						<Image source={{ uri: data?.image_url }} style={styles.image} />
					)}
				</View>
				{data?.description && (
					<Text style={styles.description}>{data?.description}</Text>
				)}
				<View style={styles.recipeMeta}>
					<View style={styles.metaEntry}>
						<Text
							style={{ color: theme.colors.secondary }}
							type="header"
							size="xl"
						>
							{data?.recipe_yield}
						</Text>
						<Text
							type="body"
							size="l"
							style={{ color: theme.colors.secondary }}
						>
							Servings
						</Text>
					</View>
					<View style={styles.metaEntry}>
						<Text
							style={{ color: theme.colors.secondary }}
							type="header"
							size="xl"
						>
							{data?.total_time}
						</Text>
						<Text
							type="body"
							size="l"
							style={{ color: theme.colors.secondary }}
						>
							Total Time
						</Text>
					</View>
				</View>
				<ChipList
					style={styles.categories}
					data={data?.categories.map((c) => ({
						value: String(c.id),
						label: c.name,
					}))}
				/>
				<View style={styles.ingredients}>
					<Text type="header" size="l">
						Ingredients
					</Text>
					{data?.ingredients?.map((ingredient, i) => (
						<Text key={`${ingredient}-${i}`} type="body">
							• {ingredient}
						</Text>
					))}
				</View>
				<View style={styles.instructions}>
					<Text type="header" size="l">
						Instructions
					</Text>
					{data?.instructions?.map((instruction, i) => (
						<View key={`${instruction}-${i}`} style={styles.instruction}>
							<Text type="header" size="m">
								{i + 1}
							</Text>
							<Text
								style={styles.instructionText}
								key={`${instruction}-${i}`}
								type="body"
							>
								{instruction}
							</Text>
						</View>
					))}
				</View>
			</ScrollView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: theme.spacing.m,
	},
	title: {
		marginBottom: theme.spacing.m,
		marginHorizontal: theme.spacing.m,
	},
	description: {
		marginBottom: theme.spacing.m,
		marginHorizontal: theme.spacing.m,
	},
	image: {
		width: SCREEN_WIDTH - theme.spacing.m * 2,
		aspectRatio: 1.7,
		borderRadius: 20,
		marginBottom: theme.spacing.m,
		marginHorizontal: theme.spacing.m,
	},
	recipeMeta: {
		backgroundColor: theme.colors.primary,
		paddingHorizontal: theme.spacing.l,
		paddingVertical: theme.spacing.l,
		marginBottom: theme.spacing.m,
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
	metaEntry: {
		alignItems: "center",
	},
	categories: {
		marginBottom: theme.spacing.s,
		marginHorizontal: theme.spacing.m,
	},
	ingredients: {
		marginBottom: theme.spacing.l,
		marginHorizontal: theme.spacing.m,
	},
	instructions: {
		marginBottom: theme.spacing.l,
		marginHorizontal: theme.spacing.m,
	},
	instruction: {
		marginBottom: theme.spacing.s,
		flexDirection: "row",
		gap: theme.spacing.s,
	},
	instructionText: {
		flex: 1,
	},
});
