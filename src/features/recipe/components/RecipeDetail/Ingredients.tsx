import { View, ViewProps } from "react-native";
import Text from "~/components/Text";
import { RecipeUpdate } from "../../recipe.types";

function Ingredients({
  recipe,
  ...props
}: { recipe?: RecipeUpdate } & ViewProps) {
  return (
    <View className={props.className}>
      <View className="gap-1">
        {recipe?.ingredients?.map((ingredient, i) => (
          <View
            key={`${ingredient}-${i}`}
            className="flex-row items-center gap-1"
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

export default Ingredients;
