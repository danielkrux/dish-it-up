import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Keyboard, Pressable, View } from "react-native";

import Button from "~/components/Button";
import InputBase from "~/components/Inputs/TextInputBase";
import RecipeQuickFilter from "./RecipeFilters";

import { BottomSheetModal as _BotomSheetModal } from "@gorhom/bottom-sheet";
import Animated, { FadeIn, FadeOut, Layout } from "react-native-reanimated";
import { Tables } from "supabase/database.types";
import BottomSheetModal from "~/components/BottomSheetModal";
import Text from "~/components/Text";
import { colors } from "~/theme";
import { hexToRGBA } from "~/utils/color";
import SortRecipes from "./SortRecipes";

function SeachAndFilter() {
	const bottomSheetRef = useRef<_BotomSheetModal>(null);
	const router = useRouter();
	const { q, s } = useLocalSearchParams<{
		q?: string;
		c?: string;
		s?: string;
	}>();
	const [isSearching, setIsSearching] = useState(false);

	function cancelSearch() {
		setIsSearching(false);
		Keyboard.dismiss();
	}

	return (
		<View className="md:mb-4">
			<View className="flex-row items-center mb-1.5">
				<Animated.View className="flex-1" layout={Layout}>
					<InputBase
						containerStyle="flex-1"
						value={q}
						onChangeText={(text) => {
							router.setParams({ q: text });
						}}
						onFocus={() => setIsSearching(true)}
						onBlur={() => setIsSearching(false)}
						placeholder="Search recipes"
					/>
				</Animated.View>

				{isSearching && (
					<Animated.View entering={FadeIn} exiting={FadeOut}>
						<Button variant="ghost" onPress={cancelSearch}>
							CANCEL
						</Button>
					</Animated.View>
				)}
			</View>
			<View>
				<RecipeQuickFilter />
				<SortRecipes />
			</View>
		</View>
	);
}

export default SeachAndFilter;
