import React from "react";
import { View } from "react-native";
import { useRouter } from "expo-router";
import ListButton from "../../components/ListButton";

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
      />
    </View>
  );
}
