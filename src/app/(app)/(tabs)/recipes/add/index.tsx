import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import Button from "~/components/Button";
import InputBase from "~/components/Inputs/TextInputBase";
import Text from "~/components/Text";

export default function Add() {
  const [error, setError] = useState<string>();
  const [url, setUrl] = useState("");
  const router = useRouter();

  function handleImportRecipe() {
    setError(undefined);

    try {
      new URL(url);
    } catch (e) {
      setError("Please enter a valid URL");
      return;
    }

    router.dismissTo(`/recipes/add/${encodeURIComponent(url)}`);
  }

  return (
    <View className="flex-1 my-12 mx-8 max-w-xl">
      <Text className="mb-2" type="header" size="2xl">
        Add a recipe
      </Text>
      <Text className="mb-2" type="body">
        Enter a URL to import a recipe from
      </Text>
      <InputBase
        containerClassName="mb-2"
        className="dark:px-0 text-gray-950"
        placeholder="e.g. https://example.com"
        onChangeText={setUrl}
        value={url}
        error={error}
      />
      <Button size="large" className="mt-2 mb-2" onPress={handleImportRecipe}>
        Import recipe
      </Button>
      <Text className="mb-2 mt-4" type="body">
        Or create a custom recipe.
      </Text>
      <Button
        variant="secondary"
        size="large"
        onPress={() => router.dismissTo("/recipes/add/custom")}
      >
        Custom recipe
      </Button>
    </View>
  );
}
