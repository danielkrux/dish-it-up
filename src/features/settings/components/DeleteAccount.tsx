import React, { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { supabase } from "~/app/_layout";
import Button from "~/components/Button";
import ListButton from "~/components/ListButton";
import Modal from "~/components/Modal";
import Text from "~/components/Text";
import { signOut } from "~/features/auth/auth.service";

function DeleteAccount() {
  const [isLoading, setIsLoading] = useState(false);

  async function deleteAccount() {
    try {
      setIsLoading(true);
      await supabase.functions.invoke("delete-account");
      await signOut();
      Toast.show({
        type: "success",
        text1: "Account deleted",
        text2: "We're sorry to see you go",
      });
    } catch (error) {
      console.error("Error deleting account", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleShowConfirmation() {
    Modal.show({
      title: "Delete Account?",
      children: (
        <>
          <Text>
            Are you sure you wish to delete your account? If you accept we will
            also delete all your data.
          </Text>
          <View className="flex-row self-end pt-8 gap-2">
            <Button size="small" variant="ghost" onPress={() => Modal.hide()}>
              No
            </Button>
            <Button
              loading={isLoading}
              size="small"
              variant="secondary"
              onPress={deleteAccount}
            >
              Yes
            </Button>
          </View>
        </>
      ),
    });
  }

  return (
    <ListButton
      label="Delete Account"
      onPress={handleShowConfirmation}
      icon="UserRoundX"
      className="mx-4 mt-12"
    />
  );
}

export default DeleteAccount;
