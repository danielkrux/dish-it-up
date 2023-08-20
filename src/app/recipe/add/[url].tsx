import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";

import { isValidUrl } from "../../../utils/url";
import Text from "../../../components/Text";
import theme from "../../../theme";
import BlurButton from "../../../components/BlurButton";
import {
  parseRecipe,
  saveRecipe,
} from "../../../features/recipe/recipe.service";

export default function AddRecipeConfirmScreen() {
  const { url: urlParam } = useLocalSearchParams();
  const statusBarHeight = StatusBar.currentHeight;

  const router = useRouter();
  const navigation = useNavigation();
  const queryClient = useQueryClient();
  const url = decodeURIComponent(urlParam as string);

  const urlValid = isValidUrl(url as string);

  const { data } = useQuery(
    ["parse-recipe", url],
    () => parseRecipe(url as string),
    {
      enabled: urlValid,
    }
  );

  const saveRecipeMutation = useMutation({
    mutationFn: saveRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipes"] });
      navigation.getParent()?.goBack();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (!data) return null;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {data.image_url && (
        <Image style={styles.image} source={{ uri: data.image_url }} />
      )}
      <View
        style={[
          styles.actions,
          {
            top: Platform.select({
              ios: theme.spacing.l,
              android: (statusBarHeight ?? 0) + theme.spacing.m,
            }),
          },
        ]}
      >
        <BlurButton icon="chevron-left" onPress={() => router.back()} />
        <BlurButton
          label="Add recipe"
          icon="plus-circle"
          onPress={() => saveRecipeMutation.mutate(data)}
        />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} type="header">
          {data.name}
        </Text>
        <Text style={styles.description} type="body">
          {data.description}
        </Text>
        <View style={styles.ingredients}>
          <Text type="header" size="l">
            Ingrediënten
          </Text>
          {data?.ingredients?.map((ingredient, i) => (
            <Text key={i} type="body">
              {ingredient}
            </Text>
          ))}
        </View>
        <Text type="header" size="l">
          Instructies
        </Text>
        {data?.instructions?.map((instruction, i) => (
          <View key={i} style={styles.instruction}>
            <Text type="header" size="m">
              {i + 1}
            </Text>
            <Text style={styles.instructionText} key={i} type="body">
              {instruction}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: theme.spacing.xl,
  },
  actions: {
    position: "absolute",
    right: theme.spacing.l,
    left: theme.spacing.l,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    height: 300,
    marginBottom: theme.spacing.l,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
  },
  name: {
    marginBottom: theme.spacing.xs,
  },
  description: {
    marginBottom: theme.spacing.l,
  },
  ingredients: {
    marginBottom: theme.spacing.l,
  },
  instruction: {
    marginBottom: theme.spacing.s,
    flexDirection: "row",
    gap: theme.spacing.s,
  },
  instructionText: {
    flex: 1,
  },
});
