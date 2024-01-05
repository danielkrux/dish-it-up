import { styled } from "nativewind";
import { View } from "react-native";

import Text from "~/components/Text";
import { Recipe } from "../../recipe.types";

function Meta({ recipe, ...props }: { recipe?: Recipe }) {
	return (
		<View
			className="p-5 flex-row rounded-2xl justify-evenly bg-acapulco-100 dark:bg-acapulco-600"
			{...props}
		>
			<View className="items-center">
				<Text className="text-acapulco-600 dark:text-acapulco-100 font-display text-xl">
					{recipe?.recipe_yield}
				</Text>
				<Text
					type="body"
					className="text-acapulco-600 dark:text-acapulco-100 text-base"
				>
					Servings
				</Text>
			</View>
			<View className="items-center">
				<Text className="text-acapulco-600 dark:text-acapulco-100 font-display text-xl">
					{recipe?.total_time}
				</Text>
				<Text
					type="body"
					className="text-acapulco-600 dark:text-acapulco-100 text-base"
				>
					Total Time
				</Text>
			</View>
		</View>
	);
}

export default styled(Meta);
