import React from "react";
import { View } from "react-native";
import Text from "~/components/Text";
import useAuth from "~/hooks/useAuth";

function Account() {
	const { session } = useAuth();

	return (
		<View className="mx-4">
			<Text>{session?.user.email}</Text>
		</View>
	);
}

export default Account;
