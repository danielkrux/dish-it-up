import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { View } from "react-native";

import Button from "~/components/Button";
import Icon from "~/components/Icon";
import { ControlledInput } from "~/components/Inputs/ControlledInputs";
import Text from "~/components/Text";
import { signInWithEmail } from "~/features/auth/auth.service";

export type SignInFormData = {
	email: string;
	password: string;
};

function SignIn() {
	const [loading, setLoading] = useState(false);
	const { control, getValues } = useForm<SignInFormData>({
		defaultValues: {
			email: "danielmartijn@gmail.com",
			password: "TestPass",
		},
	});

	async function signIn() {
		setLoading(true);
		const { email, password } = getValues();
		await signInWithEmail({ email, password });

		router.replace("/(app)/(tabs)/(home)");
		setLoading(false);
	}

	return (
		<View className="flex-1 justify-center items-center px-4">
			<Icon name="logo" size={128} className="mb-4" />
			<Text type="header" className="text-5xl mb-10">
				Dish It Up
			</Text>
			<ControlledInput
				name="email"
				label="Email"
				autoCapitalize="none"
				keyboardType="email-address"
				control={control}
				className="mb-2"
			/>
			<ControlledInput
				name="password"
				label="Password"
				keyboardType="visible-password"
				control={control}
				className="mb-8"
			/>
			<Button
				loading={loading}
				className="self-stretch mb-2"
				size="large"
				onPress={signIn}
			>
				Sign In
			</Button>
		</View>
	);
}

export default SignIn;
