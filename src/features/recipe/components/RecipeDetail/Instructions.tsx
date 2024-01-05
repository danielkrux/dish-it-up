import { styled } from "nativewind";
import React from "react";
import { View } from "react-native";
import Text from "~/components/Text";

import { Recipe } from "../../recipe.types";

export type InstructionsProps = { recipe?: Recipe };

function Instructions({ recipe, ...props }: InstructionsProps) {
	return (
		<View {...props}>
			<View className="md:g-5 md:2">
				{recipe?.instructions?.map((instruction, i) => (
					<View key={`${instruction}-${i}`} className="mb-3 flex-row g-3">
						<Text type="header" size="m">
							{i + 1}
						</Text>
						<Text className="flex-1" key={`${instruction}-${i}`} type="body">
							{instruction}
						</Text>
					</View>
				))}
			</View>
		</View>
	);
}

export default styled(Instructions);
