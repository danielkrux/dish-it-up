import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform, View } from "react-native";

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

    router.push(`/recipe/add/${encodeURIComponent(url)}`);
  }

  return (
    <View className="my-8 mx-4">
      <Text className="mb-4 text-3xl font-display">Add a recipe</Text>
      <View className="bg-gray-100 dark:bg-gray-900 p-4 rounded-2xl">
        <Text className="mb-2" type="body">
          Enter a URL to import a recipe from
        </Text>
        <InputBase
          containerClassName="mb-2"
          className="px-0 text-gray-950"
          placeholder="e.g. https://example.com"
          onChangeText={setUrl}
          value={url}
          error={error}
        />
        <Button size="large" className="mt-2 mb-2" onPress={handleImportRecipe}>
          Import recipe
        </Button>
      </View>
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
      {/* TODO: implement android */}
      {Platform.OS === "ios" ? (
        <Button
          className="mt-2"
          variant="secondary"
          size="large"
          onPress={() => router.push("/recipe/add/scan/")}
        >
          Recipe from image
        </Button>
      ) : null}
    </View>
  );
}
