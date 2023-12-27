import { useQuery } from "@tanstack/react-query";
import React from "react";
import { View } from "react-native";
import { supabase } from "~/app/_layout";
import Text from "~/components/Text";
import useAuth from "~/hooks/useAuth";

function Account() {
	const { session } = useAuth();

	console.log(session?.user.id);

	return (
		<View className="mx-4">
			<Text>{session?.user.email}</Text>
		</View>
	);
}

export default Account;
