import { View } from "react-native";

import { styled } from "nativewind";
import Text from "~/components/Text";
import { Recipe } from "../../recipe.types";

function Meta({ recipe, ...props }: { recipe?: Recipe }) {
	return (
		<View
			className="px-6 py-6 flex-row rounded-2xl justify-evenly bg-primary"
			{...props}
		>
			<View className="items-center">
				<Text className="text-secondary" type="header" size="xl">
					{recipe?.recipe_yield}
				</Text>
				<Text type="body" size="l" className="text-secondary">
					Servings
				</Text>
			</View>
			<View className="items-center">
				<Text className="text-secondary" type="header" size="xl">
					{recipe?.total_time}
				</Text>
				<Text type="body" size="l" className="text-secondary">
					Total Time
				</Text>
			</View>
		</View>
	);
}

export default styled(Meta);
