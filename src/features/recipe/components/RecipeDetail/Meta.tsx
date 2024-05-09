import { View } from "react-native";

import Text from "~/components/Text";
import { Recipe } from "../../recipe.types";
import clsx from "clsx";

function Meta({ recipe, className }: { recipe?: Recipe; className?: string }) {
  return (
    <View
      className={clsx(
        "p-5 flex-row rounded-2xl justify-evenly bg-acapulco-100 dark:bg-acapulco-600",
        className
      )}
    >
      <View className="items-center">
        <Text className="text-acapulco-600 dark:text-acapulco-100 font-display text-2xl">
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
        <Text className="text-acapulco-600 dark:text-acapulco-100 font-display text-2xl">
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

export default Meta;
