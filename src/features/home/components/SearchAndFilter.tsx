import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Keyboard, View } from "react-native";
import Button from "~/components/Button";
import InputBase from "~/components/Inputs/TextInputBase";
import RecipeQuickFilter from "./RecipeFilters";

function SeachAndFilter() {
	const router = useRouter();
	const { q } = useLocalSearchParams<{ q?: string; c?: string }>();
	const [isSearching, setIsSearching] = useState(false);

	function cancelSearch() {
		setIsSearching(false);
		Keyboard.dismiss();
	}

	return (
		<View className="md:mb-4">
			<View className="flex-row items-center mb-1.5">
				<InputBase
					containerStyle="flex-1 mb-1"
					value={q}
					onChangeText={(text) => {
						router.setParams({ q: text });
					}}
					onFocus={() => setIsSearching(true)}
					onBlur={() => setIsSearching(false)}
					placeholder="Search recipes"
				/>

				{isSearching && (
					<Button variant="ghost" onPress={cancelSearch}>
						CANCEL
					</Button>
				)}
			</View>
			<RecipeQuickFilter />
		</View>
	);
}

export default SeachAndFilter;
