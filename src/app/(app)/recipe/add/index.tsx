import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import Button from "~/components/Button";
import InputBase from "~/components/Inputs/TextInputBase";
import Text from "~/components/Text";

export default function Add() {
  const [url, setUrl] = useState("");
  const router = useRouter();

  return (
    <View className="my-5 mx-4">
      <Text className="mb-4 text-3xl font-display">Add a recipe</Text>
      <Text className="mb-2" type="body">
        Enter a URL to import a recipe from.
      </Text>
      <InputBase placeholder="Recipe URL" onChangeText={setUrl} value={url} />
      <Button
        size="large"
        className="mt-2 mb-2"
        onPress={() => router.push(`/recipe/add/${encodeURIComponent(url)}`)}
      >
        Import Recipe
      </Button>
      <Text className="mb-2 mt-4" type="body">
        Or create a custom recipe.
      </Text>
      <Button
        variant="secondary"
        size="large"
        onPress={() => router.push("/recipe/add/custom")}
      >
        Custom recipe
      </Button>
      <Button
        variant="secondary"
        size="large"
        onPress={() => router.push("/recipe/add/scan")}
      >
        Recipe from image
      </Button>
    </View>
  );
}
