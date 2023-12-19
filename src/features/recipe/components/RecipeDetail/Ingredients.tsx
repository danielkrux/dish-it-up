import { styled } from "nativewind";
import { View, ViewProps } from "react-native";
import Text from "~/components/Text";
import { Recipe } from "../../recipe.types";

function Ingredients({ recipe, ...props }: { recipe?: Recipe } & ViewProps) {
	return (
		<View style={props.style}>
			<Text type="header" size="l">
				Ingredients
			</Text>
			{recipe?.ingredients?.map((ingredient, i) => (
				<Text key={`${ingredient}-${i}`} type="body">
					• {ingredient}
				</Text>
			))}
		</View>
	);
}

export default styled(Ingredients);
