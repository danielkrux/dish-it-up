import { styled } from "nativewind";
import { View } from "react-native";

import Text from "~/components/Text";
import { Recipe } from "../../recipe.types";

function Meta({ recipe, ...props }: { recipe?: Recipe }) {
	return (
		<View
			className="p-5 flex-row rounded-2xl justify-evenly bg-primary/30"
			{...props}
		>
			<View className="items-center">
				<Text className="text-primary font-display text-xl" size="xl">
					{recipe?.recipe_yield}
				</Text>
				<Text type="body" size="l" className="text-primary">
					Servings
				</Text>
			</View>
			<View className="items-center">
				<Text className="text-primary font-display text-xl" size="xl">
					{recipe?.total_time}
				</Text>
				<Text type="body" size="l" className="text-primary">
					Total Time
				</Text>
			</View>
		</View>
	);
}

export default styled(Meta);
