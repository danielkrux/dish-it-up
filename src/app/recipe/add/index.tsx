import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import theme from "../../../theme";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import InputBase from "../../../components/Inputs/TextInputBase";

export default function Add() {
	const [url, setUrl] = useState("");
	const router = useRouter();

	return (
		<View style={styles.container}>
			<Text style={styles.title} type="header">
				Enter url
			</Text>
			<Text style={styles.description} type="body">
				Enter a URL to import a recipe from.
			</Text>
			<View>
				<InputBase
					style={styles.input}
					placeholder="Recipe URL"
					onChangeText={setUrl}
					value={url}
				/>
			</View>
			<Button
				size="large"
				onPress={() => router.push(`/recipe/add/${encodeURIComponent(url)}`)}
			>
				Import Recipe
			</Button>
			<Button
				variant="secondary"
				size="large"
				onPress={() => router.push(`/recipe/add/custom`)}
			>
				Custom recipe
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginVertical: theme.spacing.l,
		marginHorizontal: theme.spacing.m,
	},
	title: {
		marginBottom: theme.spacing.xs,
	},
	description: {
		marginBottom: theme.spacing.m,
	},
	input: {
		marginBottom: theme.spacing.s,
		alignSelf: "flex-start",
	},
});
