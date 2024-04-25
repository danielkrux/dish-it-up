import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

import ListButton from "~/components/ListButton";
import { signOut } from "~/features/auth/auth.service";
import DeleteAccount from "~/features/settings/components/DeleteAccount";

export default function Settings() {
  const router = useRouter();

  function goToCategories() {
    router.push("/settings/categories");
  }

  function goToPrivacyPolicy() {
    router.push("/settings/privacy-policy");
  }

  function goToTermsAndConditions() {
    router.push("/settings/terms-conditions");
  }

  return (
    <View>
      <ListButton
        label="Manage Categories"
        onPress={goToCategories}
        icon="Tag"
        className="mx-4"
      />
      <ListButton
        label="Sign out"
        onPress={signOut}
        icon="LogOut"
        className="mx-4 mt-12"
      />
      <DeleteAccount />
      <ListButton
        label="Privacy Policy"
        onPress={goToPrivacyPolicy}
        icon="Text"
        className="mx-4"
      />
      <ListButton
        label="Terms & Conditions"
        onPress={goToTermsAndConditions}
        icon="Text"
        className="mx-4"
      />
    </View>
  );
}
