import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import Button from "~/components/Button";
import InputBase from "~/components/Inputs/TextInputBase";
import Text from "~/components/Text";

export default function Add() {
	const [url, setUrl] = useState("");
	const router = useRouter();

	return (
		<View className="my-5 mx-4">
			<Text className="mb-1 text-3xl font-display">Enter url</Text>
			<Text className="mb-4" type="body">
				Enter a URL to import a recipe from.
			</Text>
			<InputBase placeholder="Recipe URL" onChangeText={setUrl} value={url} />
			<Button
				size="large"
				className="mt-4 mb-2"
				onPress={() => router.push(`/recipe/add/${encodeURIComponent(url)}`)}
			>
				Import Recipe
			</Button>
			<Button
				variant="ghost"
				size="large"
				onPress={() => router.push("/recipe/add/custom")}
			>
				Custom recipe
			</Button>
		</View>
	);
}
