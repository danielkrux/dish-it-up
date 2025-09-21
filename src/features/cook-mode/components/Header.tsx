import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import Button from "~/components/Button";
import IconButton from "~/components/IconButton";

function Header() {
  const router = useRouter();
  const params = useLocalSearchParams<{ ids?: string }>();

  return (
    <View className="flex-row mx-4 lg:mx-8 lg:mt-2 items-center justify-between ">
      <IconButton icon="X" size="medium" onPress={router.back} />
      <View className="flex-row items-center gap-6">
        <IconButton
          size="medium"
          icon="Plus"
          onPress={() => router.push(`/cook/select-recipe?ids=${params.ids}`)}
        />
        <Button
          // onPress={() => logRecipeRef.current?.present()}
          variant="secondary"
        >
          Done
        </Button>
      </View>
    </View>
  );
}

export default Header;
