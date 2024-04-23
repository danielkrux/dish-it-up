import { styled } from "nativewind";
import { View, ViewProps } from "react-native";
import Text from "~/components/Text";
import { Recipe } from "../../recipe.types";

function Ingredients({ recipe, ...props }: { recipe?: Recipe } & ViewProps) {
  return (
    <View style={props.style}>
      <View className="g-1">
        {recipe?.ingredients?.map((ingredient, i) => (
          <View
            key={`${ingredient}-${i}`}
            className="flex-row items-center g-1"
          >
            <Text>
              {ingredient.amount && (
                <Text className="font-body-bold text-base">
                  {ingredient.amount} {ingredient.unit}{" "}
                </Text>
              )}

              <Text className="text-sm">{ingredient.name}</Text>
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

export default styled(Ingredients);
