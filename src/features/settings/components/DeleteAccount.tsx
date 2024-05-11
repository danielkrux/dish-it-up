import React from "react";
import Toast from "react-native-toast-message";
import { supabase } from "~/app/_layout";
import ListButton from "~/components/ListButton";
import Modal from "~/components/Modal";
import { signOut } from "~/features/auth/auth.service";

function DeleteAccount() {
  async function deleteAccount() {
    try {
      await supabase.functions.invoke("delete-account");
      Modal.hide();
      await signOut();
      Toast.show({
        type: "success",
        text1: "Account deleted",
        text2: "We're sorry to see you go",
      });
    } catch (error) {
      console.error("Error deleting account", error);
    }
  }

  function handleShowConfirmation() {
    Modal.show({
      title: "Delete Account?",
      description:
        "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
      onConfirm: deleteAccount,
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
