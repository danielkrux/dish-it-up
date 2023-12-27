import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
import Button from "~/components/Button";
import Text from "~/components/Text";

function VerifyEmail() {
	return (
		<View className="flex-1 justify-center items-center px-4">
			<Text className="mb-4" type="header" size="xl">
				Email verified!
			</Text>
			<Button
				className="self-stretch"
				size="large"
				onPress={() => router.push("/")}
			>
				Let's go!
			</Button>
		</View>
	);
}

export default VerifyEmail;
