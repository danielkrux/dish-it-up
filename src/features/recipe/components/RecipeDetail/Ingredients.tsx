import { styled } from "nativewind";
import { View, ViewProps } from "react-native";
import Text from "~/components/Text";
import { Recipe } from "../../recipe.types";

function Ingredients({ recipe, ...props }: { recipe?: Recipe } & ViewProps) {
	return (
		<View style={props.style}>
			<Text type="header" className="mb-4" size="xl">
				Ingredients
			</Text>
			<View className="g-2">
				{recipe?.ingredients?.map((ingredient, i) => (
					<Text key={`${ingredient}-${i}`} type="body">
						•&nbsp;&nbsp;&nbsp;{ingredient}
					</Text>
				))}
			</View>
		</View>
	);
}

export default styled(Ingredients);
