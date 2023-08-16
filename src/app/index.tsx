import { useMemo, useState } from "react";
import { Image } from "expo-image";
import {
  FlatList,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import BottomSheet from "@gorhom/bottom-sheet";

import { getRecipes, parseRecipe } from "../services/recipe.service";
import { useRefreshOnFocus } from "../hooks/useRefreshOnFocus";
import IconButton from "../components/IconButton";
import theme from "../theme";
import EnterUrl from "../features/recipe/components/EnterUrl";
import EditRecipe from "../features/recipe/components/EditRecipe";
import { Recipe } from "../../types/Recipe";
import { isValidUrl } from "./utils/url";

const extractKey = (item: Recipe) => item.id;

export default function Home() {
  const { push } = useRouter();
  const { data, refetch } = useQuery(["recipes"], getRecipes);
  const [url, setUrl] = useState("");
  const [recipe, setRecipe] = useState<Recipe | undefined>();
  const [addingStep, setAddingStep] = useState<"enterUrl" | "editRecipe">();
  useRefreshOnFocus(refetch);

  const snapPoints = useMemo(
    () => (addingStep === "enterUrl" ? ["20%"] : ["99%"]),
    [addingStep]
  );

  useQuery(["parse-recipe", url], () => parseRecipe(url), {
    enabled: isValidUrl(url),
    onSuccess: (data) => {
      if (!data) return;
      setRecipe(data);
    },
  });

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
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => (
            <IconButton
              icon="plus"
              size="medium"
              onPress={() => setAddingStep("enterUrl")}
              style={{ alignSelf: "flex-end", marginRight: theme.spacing.s }}
            />
          ),
        }}
      />
      <FlatList
        data={data}
        keyExtractor={extractKey}
        numColumns={2}
        renderItem={renderItem}
      />
      {addingStep && (
        <BottomSheet
          onClose={() => setAddingStep(undefined)}
          snapPoints={snapPoints}
          keyboardBlurBehavior="restore"
          enablePanDownToClose
        >
          {addingStep === "enterUrl" && (
            <EnterUrl
              value={url}
              onChangeText={setUrl}
              onSubmit={() => setAddingStep("editRecipe")}
            />
          )}
          {addingStep === "editRecipe" && <EditRecipe recipe={recipe} />}
        </BottomSheet>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
