import { styled } from "nativewind";
import { View, ViewProps } from "react-native";
import Text from "~/components/Text";
import { Recipe } from "../../recipe.types";

function Ingredients({ recipe, ...props }: { recipe?: Recipe } & ViewProps) {
	return (
		<View style={props.style}>
			<Text type="header" className="mb-2 md:mb-4" size="xl">
				Ingredients
			</Text>
			<View className="g-1">
				{recipe?.ingredients?.map((ingredient, i) => (
					<View
						key={`${ingredient}-${i}`}
						className="flex-row items-center g-1"
					>
						<Text>
							{ingredient.amount && (
								<Text type="bodyBold" size="m">
									{ingredient.amount} {ingredient.unit}
									{"  "}
								</Text>
							)}

							<Text type="body">{ingredient.name}</Text>
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}

export default styled(Ingredients);
