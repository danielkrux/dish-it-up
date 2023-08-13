import { Image } from "expo-image";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Stack as RouterStack, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import { getRecipes } from "../services/recipe.service";
import { useRefreshOnFocus } from "../hooks/useRefreshOnFocus";
import { Recipe } from "../types/Recipe";
import Button from "../components/Button";

const extractKey = (item: Recipe) => item.id;

export default function Home() {
  const { push } = useRouter();
  const { data, refetch } = useQuery(["recipes"], getRecipes);
  useRefreshOnFocus(refetch);

  function renderItem({ item }: ListRenderItemInfo<Recipe>) {
    return (
      <Pressable onPress={() => push(`/recipe/${item.id}`)}>
        <Image
          style={{ height: 120, width: 120 }}
          source={{ uri: item.image_url ?? "" }}
        />
      </Pressable>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "", padding: 10 }}>
      <RouterStack.Screen options={{ title: "Home" }} />
      <Button
        variant="primary"
        size="large"
        onPress={() => push("/add-recipe/")}
        style={{ marginBottom: 10 }}
      >
        Add recipe
      </Button>

      <FlatList
        keyExtractor={extractKey}
        data={data}
        renderItem={renderItem}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
