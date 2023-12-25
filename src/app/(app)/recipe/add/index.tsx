import { Stack, useRouter } from "expo-router";
import { useState } from "react";
import { Platform, View } from "react-native";

import Button from "~/components/Button";
import InputBase from "~/components/Inputs/TextInputBase";
import Text from "~/components/Text";

export default function Add() {
	const [url, setUrl] = useState("");
	const router = useRouter();

	return (
		<View className="my-5 mx-4">
			<Text className="mb-1" type="header">
				Enter url
			</Text>
			<Text className="mb-4" type="body">
				Enter a URL to import a recipe from.
			</Text>
			<View>
				<InputBase
					className="mb-4 self-start"
					placeholder="Recipe URL"
					onChangeText={setUrl}
					value={url}
				/>
			</View>
			<Button
				size="large"
				className="mb-2"
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
