import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import React from "react";
import { View } from "react-native";

import { supabase } from "~/app/_layout";
import Button from "~/components/Button";
import Text from "~/components/Text";
import { RECIPES_QUERY_KEY } from "~/features/app/app.constants";
import useAuth from "~/hooks/useAuth";
import { formatDistanceToNowInDays } from "~/utils/date";

function Account() {
	const { session } = useAuth();
	const { data } = useQuery([RECIPES_QUERY_KEY, "last-cooked"], async () => {
		const result = await supabase
			.from("recipes")
			.select("*")
			.not("last_cooked", "is", "NULL")
			.limit(5)
			.order("created_at", { ascending: false });

		if (result.error) throw result.error;

		return result.data;
	});

	return (
		<View className="mx-4">
			<Text className="mb-8">{session?.user.email}</Text>

			<View className="flex-row justify-between">
				<Text className="font-display text-xl mb-2">Last Made</Text>
				<Button variant="ghost">See all</Button>
			</View>
			<View className="bg-gray-100 rounded-xl p-4 g-4">
				{data?.map((r) => (
					<View className="flex-row g-3" key={r.id}>
						{r.image_url && (
							<Image
								className="w-20 h-20 rounded-xl"
								source={{ uri: r.image_url }}
							/>
						)}
						<View className="flex-1">
							<Text numberOfLines={2} className="font-display text-base">
								{r?.name}
							</Text>
							<Text
								numberOfLines={1}
								className="font-body text-gray-500 text-sm"
							>
								{formatDistanceToNowInDays(new Date(r?.last_cooked ?? ""))}
							</Text>
						</View>
					</View>
				))}
			</View>
		</View>
	);
}

export default Account;
