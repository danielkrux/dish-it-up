import { useRouter } from "expo-router";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import theme from "../../../theme";
import Text from "../../../components/Text";
import Button from "../../../components/Button";
import TextInput from "../../../components/Input";

export default function Add() {
  const [url, setUrl] = useState("https://www.eefkooktzo.nl/pruimenjam/");
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title} type="header">
        Enter url
      </Text>
      <Text style={styles.description} type="body">
        Enter a URL to import a recipe from.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Recipe URL"
        onChangeText={setUrl}
        value={url}
      />
      <Button
        variant="primary"
        size="large"
        onPress={() => router.push(`/recipe/add/${encodeURIComponent(url)}`)}
      >
        Import Recipe
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: theme.spacing.l,
    marginHorizontal: theme.spacing.m,
  },
  title: {
    marginBottom: theme.spacing.xs,
  },
  description: {
    marginBottom: theme.spacing.m,
  },
  input: {
    marginBottom: theme.spacing.s,
  },
});
