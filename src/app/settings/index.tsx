import React from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import ListButton from "../../components/ListButton";
import theme from "../../theme";

export default function Settings() {
  const router = useRouter();

  function goToCategories() {
    router.push("/settings/categories");
  }

  return (
    <View>
      <ListButton
        label="Manage Categories"
        onPress={goToCategories}
        icon="tag"
        style={styles.listButton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listButton: {
    paddingHorizontal: theme.spacing.m,
  },
});
